<script setup>
  import { onMounted } from 'vue'
  import Diagram from 'diagram-js'
  import MoveModule from 'diagram-js/lib/features/move'
  import ModelingModule from 'diagram-js/lib/features/modeling'
  import { bootstrapShapes } from '../../utils/bootstrap.js'

  const bootstrapDiagram = (id) => {
    return new Diagram({
      canvas: { container: document.getElementById(id) },
      modules: [MoveModule, ModelingModule]
    })
  }

  onMounted(() => {
    const djs = bootstrapDiagram('dragging-canvas')
    bootstrapShapes(djs.get('canvas'))
  })
</script>

<template>
  <div id="dragging-canvas" class="canvas"></div>
</template>

<style scoped>
  .canvas {
    width: 100%;
    height: 100%;
  }
</style>
