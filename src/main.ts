import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import plugins from '@/plugins'


const app = createApp(App)
app.use(plugins)
app.mount('#app')
