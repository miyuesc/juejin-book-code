import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/modeler'
    },
    {
      path: '/modeler',
      name: 'modeler',
      component: () => import('./pages/DefaultModeler.vue')
    }
  ]
})

export default router
