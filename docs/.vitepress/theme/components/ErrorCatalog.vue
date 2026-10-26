<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  items: Array<{
    code: string
    title: string
    status: number
    summary: string
    link: string
  }>
  baseUri: string
}>()

const query = ref('')
const statusFilter = ref<'ALL' | '400' | '404' | '409_410' | '422_429' | '5XX'>('ALL')

const filtered = computed(() => {
  return props.items.filter((item) => {
    if (statusFilter.value === '400' && item.status !== 400) return false
    if (statusFilter.value === '404' && item.status !== 404) return false
    if (statusFilter.value === '409_410' && ![409, 410].includes(item.status)) return false
    if (statusFilter.value === '422_429' && ![422, 429].includes(item.status)) return false
    if (statusFilter.value === '5XX' && item.status < 500) return false
    if (!query.value.trim()) return true
    const q = query.value.toLowerCase()
    return (
      item.code.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      String(item.status).includes(q)
    )
  })
})
</script>

<template>
  <div style="margin: 20px 0">
    <input
      v-model="query"
      type="text"
      class="orion-search-input"
      placeholder="🔍 Filter errors by code (e.g. bad_request, transaction_failed), HTTP status (400, 404, 503), or keyword..."
    />
    <div class="orion-filter-bar">
      <button class="orion-filter-btn" :class="{ active: statusFilter === 'ALL' }" @click="statusFilter = 'ALL'">
        All ({{ items.length }})
      </button>
      <button class="orion-filter-btn" :class="{ active: statusFilter === '400' }" @click="statusFilter = '400'">
        400 Validation & Tx
      </button>
      <button class="orion-filter-btn" :class="{ active: statusFilter === '404' }" @click="statusFilter = '404'">
        404 Not Found
      </button>
      <button class="orion-filter-btn" :class="{ active: statusFilter === '409_410' }" @click="statusFilter = '409_410'">
        409 / 410 Cursor & History
      </button>
      <button class="orion-filter-btn" :class="{ active: statusFilter === '422_429' }" @click="statusFilter = '422_429'">
        422 / 429 Rate & Budget Limits
      </button>
      <button class="orion-filter-btn" :class="{ active: statusFilter === '5XX' }" @click="statusFilter = '5XX'">
        5xx Server & Timeout
      </button>
    </div>

    <div class="orion-card-grid">
      <a
        v-for="item in filtered"
        :key="item.code"
        :href="item.link"
        class="orion-error-card"
      >
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px">
            <code style="font-size: 13.5px; font-weight: 700; color: var(--vp-c-brand-1)">{{ item.code }}</code>
            <span
              class="orion-status-badge"
              :class="item.status >= 500 ? 'orion-status-5xx' : item.status === 404 ? 'orion-status-404' : 'orion-status-4xx'"
            >
              HTTP {{ item.status }}
            </span>
          </div>
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 6px">{{ item.title }}</div>
          <p style="font-size: 12.5px; opacity: 0.8; margin: 0; line-height: 1.5">{{ item.summary }}</p>
        </div>
        <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--vp-c-divider); font-size: 11.5px; font-family: var(--vp-font-family-mono); opacity: 0.65; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
          {{ baseUri }}/{{ item.code }}
        </div>
      </a>
    </div>
  </div>
</template>
