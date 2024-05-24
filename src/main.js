// assets
import './assets/main.css'

// main files
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

// axios config
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = import.meta.env.VITE_VUE_APP_PROD_API;

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
