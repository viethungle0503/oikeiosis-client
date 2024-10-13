import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createBootstrap} from 'bootstrap-vue-next'
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

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import '@/assets/styles.scss'

const app = createApp(App)

app.use(createPinia())
app.use(createBootstrap())
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
