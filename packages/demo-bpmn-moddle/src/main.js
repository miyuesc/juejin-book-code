import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import 'virtual:uno.css'

import Naive from 'naive-ui'

import './assets/tool-icons.css'
import './assets/style.css'
import 'diagram-js/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'

const app = createApp(App)
app.use(router)
app.use(Naive)
app.mount('#app')
