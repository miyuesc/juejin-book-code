import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/viewer'
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: () => import('./pages/DefaultViewer.vue')
    },
    {
      path: '/baseViewer',
      name: 'baseViewer',
      component: () => import('./pages/BaseViewer.vue')
    },
    {
      path: '/navigatedViewer',
      name: 'navigatedViewer',
      component: () => import('./pages/NavigatedViewer.vue')
    },
    {
      path: '/modeler',
      name: 'modeler',
      component: () => import('./pages/DefaultModeler.vue')
    }
  ]
})

export default router
