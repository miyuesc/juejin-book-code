<script setup>
  import { onMounted } from 'vue'
  import Diagram from 'diagram-js'
  import SelectionModule from 'diagram-js/lib/features/selection'
  import { bootstrapShapes } from '../../utils/bootstrap.js'

  const bootstrapDiagram = (id) => {
    return new Diagram({
      canvas: { container: document.getElementById(id) },
      modules: [SelectionModule]
    })
  }

  onMounted(() => {
    const djs = bootstrapDiagram('selection-canvas')
    bootstrapShapes(djs.get('canvas'))
  })
</script>

<template>
  <div id="selection-canvas" class="canvas"></div>
</template>

<style scoped>
  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
