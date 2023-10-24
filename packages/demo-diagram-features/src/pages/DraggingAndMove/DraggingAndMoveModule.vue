<script setup>
  import { onMounted } from 'vue'
  import Diagram from 'diagram-js'
  import MoveModule from 'diagram-js/lib/features/move'
  import ModelingModule from 'diagram-js/lib/features/modeling'
  import { bootstrapShapes } from '../../utils/bootstrap.js'

  import CustomRules from '../../modules/customRules.js'

  const bootstrapDiagram = (id) => {
    return new Diagram({
      canvas: { container: document.getElementById(id) },
      modules: [MoveModule, ModelingModule, CustomRules]
    })
  }

  onMounted(() => {
    const djs = bootstrapDiagram('dragging-canvas')
    bootstrapShapes(djs.get('canvas'))

    // djs.get('eventBus').on('shape.move.start', 1300, ({ context }) => {
    //   const { validatedShapes, target } = context
    //   if (validatedShapes.findIndex((i) => i.id === 's1') > -1) {
    //     return false
    //   }
    // })

    djs.get('eventBus').on('shape.move.end', () => {
      console.log(djs.get('elementRegistry').getAll())
    })
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
