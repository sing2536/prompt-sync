import "./assets/base.less"

import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import tooltip from "./mixins/tooltip-vue3"
import focus from "./mixins/vFocus"

const app = createApp(App)

app.use(createPinia())
app.use(tooltip)
app.use(focus)

app.mount("#app")
