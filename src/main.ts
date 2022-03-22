import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(registerApp)

app.use(store)
setupStore()
app.use(router)

app.mount('#app')
