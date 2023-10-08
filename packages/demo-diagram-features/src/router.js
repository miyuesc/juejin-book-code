import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/paletteProvider'
    },
    {
      path: '/paletteProvider',
      component: () => import('./pages/Palette/PaletteProvider.vue')
    },
    {
      path: '/contextPadProvider',
      component: () => import('./pages/ContextPad/ContextPadProvider.vue')
    },
    {
      path: '/overlays1',
      component: () => import('./pages/Overlays/DOverlays.vue')
    },
    {
      path: '/overlays2',
      component: () => import('./pages/Overlays/DOverlays2.vue')
    },
    {
      path: '/overlays3',
      component: () => import('./pages/Overlays/DOverlays3.vue')
    },
    {
      path: '/create',
      component: () => import('./pages/Create/CreateDemo.vue')
    }
  ]
})

export default router
