import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/tool-icons.css'
import './assets/style.css'
import 'diagram-js/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'

import 'bpmn-js-properties-panel/dist/assets/element-templates.css'
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'

import './assets/high-contrast-canvas.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
