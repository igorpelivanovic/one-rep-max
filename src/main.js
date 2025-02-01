import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import tooltip from './directives/tooltip'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.directive('tooltip', tooltip)
app.use(router)

app.mount('#app')
