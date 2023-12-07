import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'ParseName',
      component: () => import('./pages/main/ParseNameDemo.vue')
    },
    {
      path: '/moddle',
      name: 'Moddle',
      component: () => import('./pages/main/ModdelDemo.vue')
    },
    {
      path: '/saxen',
      name: 'Saxen',
      component: () => import('./pages/main/SaxenDemo.vue')
    },
    {
      path: '/moddle-xml-reader',
      name: 'moddle-xml-reader',
      component: () => import('./pages/main/ModdleXmlReaderDemo.vue')
    },
    {
      path: '/moddle-xml-writer',
      name: 'moddle-xml-writer',
      component: () => import('./pages/main/ModdleXmlWriterDemo.vue')
    }
  ]
})

export default router
