import './assets/base.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import tooltip from './mixins/tooltip-vue3'

const app = createApp(App)

app.use(createPinia())
app.use(tooltip)

app.mount('#app')
