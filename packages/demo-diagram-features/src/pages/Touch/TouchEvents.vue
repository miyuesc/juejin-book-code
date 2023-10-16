<script setup>
  import { onMounted } from 'vue'
  import Diagram from 'diagram-js'
  import TouchModule from 'diagram-js/lib/features/touch'
  import { bootstrapShapes } from '../../utils/bootstrap.js'
  import InteractionEventsModule from 'diagram-js/lib/features/interaction-events'

  const bootstrapDiagram = (id) => {
    return new Diagram({
      canvas: { container: document.getElementById(id) },
      modules: [
        InteractionEventsModule
        // TouchModule
      ]
    })
  }

  const events = ['element.click', 'element.contextmenu', 'element.dblclick', 'element.mousedown', 'element.mousemove', 'element.hover', 'element.out', 'element.mouseup']

  onMounted(() => {
    const djs = bootstrapDiagram('touch-canvas')
    bootstrapShapes(djs.get('canvas'))

    djs.get('eventBus').on(events, ({ element, gfx, originalEvent, type }) => {
      console.log('eventType: ', type, ', element: ', element.id)
    })
  })
</script>

<template>
  <div id="touch-canvas" class="canvas"></div>
</template>

<style scoped>
  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
