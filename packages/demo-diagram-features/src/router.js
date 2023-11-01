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
      path: '/touch',
      component: () => import('./pages/Touch/TouchEvents.vue')
    },
    {
      path: '/selection',
      component: () => import('./pages/Selection/SelectionModule.vue')
    },
    {
      path: '/draggingAndMove',
      component: () => import('./pages/DraggingAndMove/DraggingAndMoveModule.vue')
    },
    {
      path: '/ModelingModule',
      component: () => import('./pages/ModelingModule/ModelingModule.vue')
    }
  ]
})

export default router
