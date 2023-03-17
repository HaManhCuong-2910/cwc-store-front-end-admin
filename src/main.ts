import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponent } from './utils/import'

const app = createApp(App)

registerGlobalComponent(app)
