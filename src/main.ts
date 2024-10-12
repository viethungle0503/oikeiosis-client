import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import mitt from 'mitt' // Import mitt
const emitter = mitt() // Initialize mitt
import pages from './utils/data' // Import data.ts
import '@/mocks/axios' // Import axios mock

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
        darkModeSelector: '.system-appearance-dark',
    }
}
})
app.use(ToastService)
app.use(axios, {
  baseUrl: 'https://cataas.com/'
})
app.provide('emitter', emitter) // ✅ Provide as `emitter`
app.provide('$pages', pages) // ✅ Provide pages

app.mount('#app')
