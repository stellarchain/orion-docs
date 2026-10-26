import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import LiveNetworkBadge from './components/LiveNetworkBadge.vue'
import ApiPlayground from './components/ApiPlayground.vue'
import ErrorCatalog from './components/ErrorCatalog.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LiveNetworkBadge)
    })
  },
  enhanceApp({ app }) {
    app.component('ApiPlayground', ApiPlayground)
    app.component('ErrorCatalog', ErrorCatalog)
  }
}
