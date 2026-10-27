import DefaultTheme from 'vitepress/theme'
import { h, watch } from 'vue'
import './custom.css'
import LiveNetworkBadge from './components/LiveNetworkBadge.vue'
import ApiPlayground from './components/ApiPlayground.vue'
import ErrorCatalog from './components/ErrorCatalog.vue'

function sendDocsBeacon(path: string) {
  if (typeof window === 'undefined') return
  const payload = JSON.stringify({
    path: path || window.location.pathname,
    title: document.title || '',
    referrer: document.referrer ? new URL(document.referrer).hostname : 'direct'
  })
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('/__analytics/beacon', blob)
      return
    }
  } catch (_) {}
  fetch('/__analytics/beacon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true
  }).catch(() => {})
}

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LiveNetworkBadge)
    })
  },
  enhanceApp({ app, router }) {
    app.component('ApiPlayground', ApiPlayground)
    app.component('ErrorCatalog', ErrorCatalog)

    if (typeof window !== 'undefined') {
      let lastTracked = ''
      const track = (toPath: string) => {
        const clean = (toPath || window.location.pathname).split('?')[0].split('#')[0] || '/'
        if (clean === lastTracked) return
        lastTracked = clean
        setTimeout(() => sendDocsBeacon(clean), 50)
      }
      setTimeout(() => track(window.location.pathname), 100)
      watch(
        () => router.route.path,
        (newPath) => track(newPath)
      )
    }
  }
}
