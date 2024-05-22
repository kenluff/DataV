import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerEcharts } from '@/plugins/echarts'

import App from './App.vue'
import router from './router'

import './assets/css/main.css'

const app = createApp(App)

registerEcharts(app)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
