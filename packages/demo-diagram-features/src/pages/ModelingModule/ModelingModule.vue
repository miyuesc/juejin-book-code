<script setup>
  import { onMounted } from 'vue'
  import Diagram from 'diagram-js'
  import ModelingModule from 'diagram-js/lib/features/modeling'
  import { bootstrapShapes } from '../../utils/bootstrap.js'
  import MoveModule from 'diagram-js/lib/features/move/index.js'
  import AutoScrollModule from 'diagram-js/lib/features/auto-scroll/index.js'

  let djs

  const bootstrapDiagram = (id) => {
    return new Diagram({
      canvas: { container: document.getElementById(id) },
      modules: [MoveModule, ModelingModule, AutoScrollModule]
    })
  }

  const undo = () => {
    debugger
    djs && djs.get('commandStack').undo()
  }

  onMounted(() => {
    djs = bootstrapDiagram('canvas')
    bootstrapShapes(djs.get('canvas'))
  })
</script>

<template>
  <div class="modeling-content">
    <div id="canvas" class="canvas"></div>
    <div class="header-buttons">
      <el-button type="primary" @click="undo">撤销</el-button>
    </div>
  </div>
</template>

<style scoped>
  .modeling-content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .canvas {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
</style>
