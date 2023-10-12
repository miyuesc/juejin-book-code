<script setup>
  import { onMounted } from 'vue'
  import Diagram from 'diagram-js'
  import TouchModule from 'diagram-js/lib/features/touch'
  import { bootstrapShapes } from '../../utils/bootstrap.js'

  const bootstrapDiagram = (id) => {
    return new Diagram({
      canvas: { container: document.getElementById(id) }
      // modules: [TouchModule]
    })
  }

  onMounted(() => {
    const djs = bootstrapDiagram('touch-canvas')
    bootstrapShapes(djs.get('canvas'))
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
