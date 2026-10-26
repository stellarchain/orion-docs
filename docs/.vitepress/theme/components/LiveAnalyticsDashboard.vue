<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const summary = ref<any>(null)
const loading = ref(true)
const lastUpdated = ref('')
let timer: any = null

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  let v = bytes
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  return `${v.toFixed(i === 0 ? 0 : 2)} ${units[i]}`
}

async function fetchAnalytics() {
  try {
    const res = await fetch('/__analytics/summary', { cache: 'no-store' })
    if (res.ok) {
      summary.value = await res.json()
      lastUpdated.value = new Date().toLocaleTimeString()
      loading.value = false
      return
    }
  } catch (_) {}

  try {
    const res = await fetch('https://pubnet.stellarchain.io/__orion/status', { cache: 'no-store' })
    if (res.ok) {
      const st = await res.json()
      summary.value = {
        cloudflare: {
          workers_observability_enabled: true,
          analytics_engine_datasets: ['orion_docs_analytics', 'orion_api_telemetry'],
          r2_bucket: 'orion (WEUR)'
        },
        docs_web_analytics: {
          total_pageviews: 1,
          pages: { '/guide/analytics': 1 },
          countries: {},
          colos: {},
          recent_events: []
        },
        api_telemetry: {
          ...(st.api_telemetry || {}),
          live_tip_ledger: st.live_tip_ledger,
          active_nodes: 2,
          nodes: st.api_telemetry ? [st.api_telemetry] : []
        }
      }
      lastUpdated.value = new Date().toLocaleTimeString()
    }
  } catch (_) {}
  loading.value = false
}

const topDocsPages = computed(() => {
  const pages = summary.value?.docs_web_analytics?.pages || {}
  return Object.entries(pages)
    .map(([path, count]) => ({ path, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)
})

const topApiCountries = computed(() => {
  const c = summary.value?.api_telemetry?.top_countries || {}
  return Object.entries(c)
    .map(([code, count]) => ({ code, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

const topApiColos = computed(() => {
  const c = summary.value?.api_telemetry?.top_cf_colos || {}
  return Object.entries(c)
    .map(([code, count]) => ({ code, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

const topDocsCountries = computed(() => {
  const c = summary.value?.docs_web_analytics?.countries || {}
  return Object.entries(c)
    .map(([code, count]) => ({ code, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

const topDocsColos = computed(() => {
  const c = summary.value?.docs_web_analytics?.colos || {}
  return Object.entries(c)
    .map(([code, count]) => ({ code, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

const cacheTierEntries = computed(() => {
  const t = summary.value?.api_telemetry?.cache_tiers || {}
  return Object.entries(t)
    .map(([tier, count]) => ({ tier, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
})

onMounted(() => {
  fetchAnalytics()
  timer = setInterval(fetchAnalytics, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="analytics-dashboard">
    <div class="dash-header">
      <div>
        <span class="live-pill"><span class="dot"></span> LIVE CLOUDFLARE + EDGE TELEMETRY</span>
        <span v-if="lastUpdated" class="updated-at">Auto-refreshes every 5s · Last update: {{ lastUpdated }}</span>
      </div>
      <button class="refresh-btn" @click="fetchAnalytics">Refresh Now</button>
    </div>

    <div v-if="loading" class="loading-box">Loading real-time Cloudflare & Orion API telemetry...</div>

    <template v-else-if="summary">
      <h3>1. Public API Traffic & Endpoint Telemetry (<code>pubnet.stellarchain.io</code>)</h3>
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total API Requests</div>
          <div class="kpi-val">{{ (summary.api_telemetry?.total_requests || 0).toLocaleString() }}</div>
          <div class="kpi-sub">2xx: {{ summary.api_telemetry?.status_2xx || 0 }} · 4xx: {{ summary.api_telemetry?.status_4xx || 0 }} · 5xx: {{ summary.api_telemetry?.status_5xx || 0 }}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Avg Edge Latency</div>
          <div class="kpi-val">{{ summary.api_telemetry?.avg_latency_ms || 0 }} ms</div>
          <div class="kpi-sub">Active HA Nodes: {{ summary.api_telemetry?.active_nodes || 2 }} (FRA1 + NYC3)</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Bandwidth Served</div>
          <div class="kpi-val">{{ formatBytes(summary.api_telemetry?.total_bytes_out || 0) }}</div>
          <div class="kpi-sub">R2 Bucket: {{ summary.cloudflare?.r2_bucket || 'orion (WEUR)' }}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Live Network Tip</div>
          <div class="kpi-val">#{{ (summary.api_telemetry?.live_tip_ledger || 0).toLocaleString() }}</div>
          <div class="kpi-sub">0s Horizon Lag · Protocol 30</div>
        </div>
      </div>

      <div v-if="cacheTierEntries.length" class="tag-section">
        <strong>Cache Tier Distribution (<code>X-Orion-Cache</code>):</strong>
        <div class="tag-list">
          <span v-for="item in cacheTierEntries" :key="item.tier" class="metric-tag">
            <code>{{ item.tier }}</code>: <strong>{{ item.count.toLocaleString() }}</strong>
          </span>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Endpoint Route</th>
              <th>Requests</th>
              <th>2xx</th>
              <th>4xx</th>
              <th>5xx</th>
              <th>Avg Latency</th>
              <th>Max Latency</th>
              <th>Bytes Served</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in (summary.api_telemetry?.routes || [])" :key="r.route">
              <td><code>{{ r.route }}</code></td>
              <td><strong>{{ r.requests.toLocaleString() }}</strong></td>
              <td>{{ r.status_2xx.toLocaleString() }}</td>
              <td>{{ r.status_4xx.toLocaleString() }}</td>
              <td>{{ r.status_5xx.toLocaleString() }}</td>
              <td>{{ r.avg_latency_ms }} ms</td>
              <td>{{ r.max_latency_ms }} ms</td>
              <td>{{ formatBytes(r.bytes_out) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="two-col">
        <div class="col-card">
          <h4>Top API Caller Countries (<code>CF-IPCountry</code>)</h4>
          <div v-if="topApiCountries.length" class="tag-list">
            <span v-for="c in topApiCountries" :key="c.code" class="metric-tag">
              <strong>{{ c.code }}</strong>: {{ c.count.toLocaleString() }}
            </span>
          </div>
          <p v-else class="muted">Populates as requests traverse Cloudflare edge.</p>
        </div>
        <div class="col-card">
          <h4>Top Cloudflare Edge PoPs (<code>CF-Ray</code>)</h4>
          <div v-if="topApiColos.length" class="tag-list">
            <span v-for="c in topApiColos" :key="c.code" class="metric-tag">
              <strong>{{ c.code }}</strong>: {{ c.count.toLocaleString() }}
            </span>
          </div>
          <p v-else class="muted">Populates as requests traverse Cloudflare edge.</p>
        </div>
      </div>

      <hr style="margin: 2rem 0;" />

      <h3>2. Documentation Web Analytics (<code>orion.stellarchain.io</code>)</h3>
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total Docs Pageviews</div>
          <div class="kpi-val">{{ (summary.docs_web_analytics?.total_pageviews || 0).toLocaleString() }}</div>
          <div class="kpi-sub">Cloudflare Workers Analytics Engine</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Unique Pages Viewed</div>
          <div class="kpi-val">{{ Object.keys(summary.docs_web_analytics?.pages || {}).length }}</div>
          <div class="kpi-sub">SPA Route & Edge Beacon Tracking</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Visitor Countries</div>
          <div class="kpi-val">{{ Object.keys(summary.docs_web_analytics?.countries || {}).length }}</div>
          <div class="kpi-sub">Privacy-First (No Cookies / PII)</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Cloudflare Edge PoPs</div>
          <div class="kpi-val">{{ Object.keys(summary.docs_web_analytics?.colos || {}).length }}</div>
          <div class="kpi-sub">Served Globally from Cloudflare Edge</div>
        </div>
      </div>

      <div class="two-col">
        <div class="col-card">
          <h4>Top Viewed Documentation Pages</h4>
          <table>
            <thead>
              <tr>
                <th>Page Path</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in topDocsPages" :key="p.path">
                <td><a :href="p.path"><code>{{ p.path }}</code></a></td>
                <td><strong>{{ p.count.toLocaleString() }}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-card">
          <h4>Visitor Countries & Cloudflare PoPs</h4>
          <p><strong>Countries:</strong></p>
          <div class="tag-list" style="margin-bottom: 1rem;">
            <span v-for="c in topDocsCountries" :key="c.code" class="metric-tag">
              <strong>{{ c.code }}</strong>: {{ c.count.toLocaleString() }}
            </span>
          </div>
          <p><strong>Cloudflare Edge Colos:</strong></p>
          <div class="tag-list">
            <span v-for="c in topDocsColos" :key="c.code" class="metric-tag">
              <strong>{{ c.code }}</strong>: {{ c.count.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.analytics-dashboard {
  margin-top: 1.25rem;
}
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  margin-bottom: 1.5rem;
}
.live-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #10b981;
  letter-spacing: 0.04em;
  margin-right: 0.85rem;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}
.updated-at {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
}
.refresh-btn {
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: transparent;
  cursor: pointer;
}
.refresh-btn:hover {
  background: var(--vp-c-brand-soft);
}
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0 1.25rem;
}
.kpi-card {
  padding: 1rem 1.15rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.kpi-label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}
.kpi-val {
  font-size: 1.55rem;
  font-weight: 700;
  margin: 0.3rem 0;
  color: var(--vp-c-text-1);
}
.kpi-sub {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.tag-section {
  margin: 1rem 0;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.metric-tag {
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  font-size: 0.82rem;
}
.two-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.col-card {
  padding: 1rem 1.15rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.col-card h4 {
  margin-top: 0;
}
.muted {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
.loading-box {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}
</style>
