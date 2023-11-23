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
      path: '/moddle-xml',
      name: 'moddle-xml',
      component: () => import('./pages/main/ModdleXmlDemo.vue')
    }
  ]
})

export default router
