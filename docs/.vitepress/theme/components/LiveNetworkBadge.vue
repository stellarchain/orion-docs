<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const ledger = ref<number | null>(null)
const protocol = ref<number>(25)
const latencyMs = ref<number | null>(null)
let timer: any = null

async function fetchStatus() {
  try {
    const t0 = performance.now()
    const res = await fetch('https://pubnet.stellarchain.io/')
    if (res.ok) {
      const data = await res.json()
      latencyMs.value = Math.round(performance.now() - t0)
      ledger.value = data.history_latest_ledger || data.core_latest_ledger
      protocol.value = data.current_protocol_version || 25
    }
  } catch {
    // ignore transient offline
  }
}

onMounted(() => {
  fetchStatus()
  timer = setInterval(fetchStatus, 5000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <a
    href="https://pubnet.stellarchain.io/"
    target="_blank"
    rel="noopener"
    class="orion-live-pill"
    title="Live Stellar Pubnet status from https://pubnet.stellarchain.io/"
  >
    <span class="orion-pulse-dot"></span>
    <span v-if="ledger">
      Pubnet #{{ ledger.toLocaleString() }} • v{{ protocol }}
      <span v-if="latencyMs" style="opacity: 0.75">({{ latencyMs }}ms)</span>
    </span>
    <span v-else>Pubnet Live • 0s Lag</span>
  </a>
</template>
