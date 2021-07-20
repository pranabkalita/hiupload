import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

try {
  // Call this to check if the user is logged in before the app loads
  store.dispatch('auth/me')

  createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
} catch (e) {
  console.warn(e)
}
