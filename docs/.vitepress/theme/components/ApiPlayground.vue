<script setup lang="ts">
import { ref, computed } from 'vue'

const presets = [
  {
    label: 'Root Discovery (GET /)',
    category: 'API',
    path: '/'
  },
  {
    label: 'Ledger #65149988 Operations',
    category: 'API',
    path: '/ledgers/65149988/operations?limit=2'
  },
  {
    label: 'Live Statistics Catalog (GET /statistics)',
    category: 'API',
    path: '/statistics'
  },
  {
    label: 'Category Resource: /statistics/contracts',
    category: 'API',
    path: '/statistics/contracts?fields=active,callers,events&limit=2'
  },
  {
    label: 'Metric: /statistics/assets/active',
    category: 'API',
    path: '/statistics/assets/active?limit=5&order=desc'
  },
  {
    label: 'Trigger 400: invalid_accounts_params',
    category: 'Error',
    path: '/accounts'
  },
  {
    label: 'Trigger 400: bad_request (native filter)',
    category: 'Error',
    path: '/accounts?asset=native'
  },
  {
    label: 'Trigger 404: not_found',
    category: 'Error',
    path: '/ledgers/999999999'
  },
  {
    label: 'Trigger 400: invalid_order_book',
    category: 'Error',
    path: '/order_book'
  },
  {
    label: 'Trigger 400: invalid_statistics_query',
    category: 'Error',
    path: '/statistics/direct-payments?limit=0'
  }
]

const currentPath = ref('/accounts?asset=native')
const loading = ref(false)
const status = ref<number | null>(null)
const durationMs = ref<number | null>(null)
const responseJson = ref<any>(null)
const rawText = ref('')
const decoderInput = ref('')
const activeTab = ref<'playground' | 'decoder'>('playground')

const detectedDocLink = computed(() => {
  if (responseJson.value && typeof responseJson.value.type === 'string') {
    const t: string = responseJson.value.type
    if (t.includes('/horizon-errors/') || t.includes('/problems/')) {
      try {
        const u = new URL(t)
        return u.pathname
      } catch {
        return t
      }
    }
  }
  return null
})

async function runRequest(pathOverride?: string) {
  if (pathOverride) currentPath.value = pathOverride
  loading.value = true
  try {
    const clean = currentPath.value.startsWith('/') ? currentPath.value : '/' + currentPath.value
    const url = 'https://pubnet.stellarchain.io' + clean
    const t0 = performance.now()
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    durationMs.value = Math.round(performance.now() - t0)
    status.value = res.status
    const txt = await res.text()
    rawText.value = txt
    try {
      responseJson.value = JSON.parse(txt)
    } catch {
      responseJson.value = null
    }
  } catch (e: any) {
    status.value = 0
    rawText.value = String(e)
  } finally {
    loading.value = false
  }
}

const decodedDiagnostic = computed(() => {
  const raw = decoderInput.value.trim()
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    const typeUrl = parsed.type || ''
    const code = parsed.code || (typeUrl.split('/').pop() || 'unknown')
    const txCode = parsed.extras?.result_codes?.transaction || null
    const opCodes = parsed.extras?.result_codes?.operations || []
    let docPath = '/horizon-errors/'
    if (typeUrl.includes('/problems/')) docPath = `/problems/${code}`
    else if (code) docPath = `/horizon-errors/${code}`
    return {
      title: parsed.title || 'RFC 7807 Problem Details',
      status: parsed.status || 400,
      code,
      detail: parsed.detail || '',
      invalidField: parsed.extras?.invalid_field || null,
      reason: parsed.extras?.reason || null,
      txCode,
      opCodes,
      docPath
    }
  } catch {
    const slug = raw.toLowerCase().replace(/[^a-z0-9_-]/g, '')
    if (slug.startsWith('tx_')) {
      return {
        title: `Transaction Result Code: ${slug}`,
        status: 400,
        code: slug,
        detail: 'Stellar Core transaction-level XDR failure code.',
        docPath: '/result-codes/transactions'
      }
    }
    if (slug.startsWith('op_')) {
      return {
        title: `Operation Result Code: ${slug}`,
        status: 400,
        code: slug,
        detail: 'Stellar Core operation-level XDR failure code.',
        docPath: '/result-codes/operations'
      }
    }
    return {
      title: `Error Code Lookup: ${slug}`,
      status: 400,
      code: slug,
      detail: 'Direct error slug lookup.',
      docPath: `/horizon-errors/${slug}`
    }
  }
})

// Run initial demo on mount
if (typeof window !== 'undefined') {
  runRequest('/accounts?asset=native')
}
</script>

<template>
  <div class="orion-error-banner" style="margin-top: 24px">
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px">
      <div style="display: flex; align-items: center; gap: 10px">
        <button
          class="orion-filter-btn"
          :class="{ active: activeTab === 'playground' }"
          @click="activeTab = 'playground'"
        >
          ⚡ Live Pubnet API & Error Tester
        </button>
        <button
          class="orion-filter-btn"
          :class="{ active: activeTab === 'decoder' }"
          @click="activeTab = 'decoder'"
        >
          🔍 Paste Error JSON / Result Code Decoder
        </button>
      </div>
      <span style="font-size: 12px; opacity: 0.75; font-family: var(--vp-font-family-mono)">
        Target: https://pubnet.stellarchain.io
      </span>
    </div>

    <div v-if="activeTab === 'playground'">
      <div class="orion-filter-bar">
        <button
          v-for="p in presets"
          :key="p.path"
          class="orion-filter-btn"
          :class="{ active: currentPath === p.path }"
          @click="runRequest(p.path)"
        >
          <span :style="{ color: p.category === 'Error' ? '#f59e0b' : '#10b981' }">●</span>
          {{ p.label }}
        </button>
      </div>

      <div style="display: flex; gap: 8px; margin-top: 10px">
        <input
          v-model="currentPath"
          class="orion-search-input"
          placeholder="/ledgers/65149988/operations or /accounts?asset=native"
          @keyup.enter="runRequest()"
        />
        <button
          @click="runRequest()"
          style="padding: 0 20px; border-radius: 10px; background: var(--vp-c-brand-1); color: white; font-weight: 700; font-size: 13px; cursor: pointer; border: none; white-space: nowrap"
        >
          {{ loading ? 'Running...' : 'Send Request' }}
        </button>
      </div>

      <div v-if="status !== null" style="margin-top: 14px">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 8px">
          <div style="display: flex; align-items: center; gap: 10px">
            <span
              class="orion-status-badge"
              :class="status >= 500 ? 'orion-status-5xx' : status >= 400 ? 'orion-status-4xx' : ''"
              :style="status === 200 ? 'background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.35)' : ''"
            >
              HTTP {{ status }}
            </span>
            <span v-if="durationMs !== null" style="font-size: 12px; opacity: 0.75; font-family: var(--vp-font-family-mono)">
              {{ durationMs }} ms
            </span>
          </div>
          <a
            v-if="detectedDocLink"
            :href="detectedDocLink"
            style="font-size: 13px; font-weight: 600; color: var(--vp-c-brand-1)"
          >
            📖 Open Linked Error Doc ({{ detectedDocLink }}) →
          </a>
        </div>
        <pre style="max-height: 290px; overflow: auto; background: var(--vp-c-bg); padding: 14px; border-radius: 10px; border: 1px solid var(--vp-c-divider); font-size: 12.5px; margin: 0"><code>{{ responseJson ? JSON.stringify(responseJson, null, 2) : rawText }}</code></pre>
      </div>
    </div>

    <div v-else>
      <p style="margin: 6px 0 10px; font-size: 13.5px; opacity: 0.85">
        Paste any Horizon or Orion <code>application/problem+json</code> response or type a Stellar result code (e.g. <code>op_underfunded</code>, <code>tx_bad_seq</code>, <code>invalid_accounts_params</code>):
      </p>
      <textarea
        v-model="decoderInput"
        rows="5"
        class="orion-search-input"
        style="font-family: var(--vp-font-family-mono); font-size: 12.5px"
        placeholder='{"type":"https://orion.stellarchain.io/horizon-errors/transaction_failed","title":"Transaction Failed","status":400,"extras":{"result_codes":{"transaction":"tx_failed","operations":["op_underfunded"]}}}'
      ></textarea>
      <div v-if="decodedDiagnostic" style="margin-top: 12px; padding: 14px; border-radius: 10px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider)">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px">
          <div>
            <span class="orion-status-badge orion-status-4xx">HTTP {{ decodedDiagnostic.status }}</span>
            <strong style="margin-left: 10px">{{ decodedDiagnostic.title }}</strong>
          </div>
          <a :href="decodedDiagnostic.docPath" style="font-weight: 700; color: var(--vp-c-brand-1)">
            View Full Reference ({{ decodedDiagnostic.docPath }}) →
          </a>
        </div>
        <p v-if="decodedDiagnostic.detail" style="margin: 8px 0 4px; font-size: 13px">{{ decodedDiagnostic.detail }}</p>
        <div v-if="decodedDiagnostic.invalidField" style="font-size: 13px; margin-top: 6px">
          • Invalid Parameter: <code>{{ decodedDiagnostic.invalidField }}</code> — {{ decodedDiagnostic.reason }}
        </div>
        <div v-if="decodedDiagnostic.txCode" style="font-size: 13px; margin-top: 6px">
          • Transaction Result Code: <a href="/result-codes/transactions"><code>{{ decodedDiagnostic.txCode }}</code></a>
          <span v-if="decodedDiagnostic.opCodes?.length">
            | Operation Codes:
            <a v-for="op in decodedDiagnostic.opCodes" :key="op" href="/result-codes/operations" style="margin-right: 6px">
              <code>{{ op }}</code>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
