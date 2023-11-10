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
    }
  ]
})

export default router
