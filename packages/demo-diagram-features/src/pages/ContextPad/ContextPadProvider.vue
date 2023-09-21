<script setup>
  import { onMounted, ref } from 'vue'
  import Diagram from 'diagram-js'
  import ContextPad from 'diagram-js/lib/features/context-pad/index.js'
  import TouchModule from 'diagram-js/lib/features/touch'
  import SelectionModule from 'diagram-js/lib/features/selection'
  import { DemoContextPadProvider, DemoContextPadProvider2 } from '../../modules/contextPadProvider.js'
  import RewriteContextPad from '../../modules/contextPad.js'
  import { bootstrapShapes } from '../../utils/bootstrap.js'

  const dialogVisible = ref(false)
  const toggleDialog = () => {
    dialogVisible.value = !dialogVisible.value
  }

  const bootstrapDiagram = (id, modules) => {
    const djs = new Diagram({
      canvas: { container: document.getElementById(id) },
      modules: [
        TouchModule,
        SelectionModule,
        ...modules,
        {
          __init__: ['demoContextPadProvider', 'demoContextPadProvider2'],
          demoContextPadProvider: ['type', DemoContextPadProvider],
          demoContextPadProvider2: ['type', DemoContextPadProvider2]
        }
      ],
      componentMethods: {
        toggleDialog
      }
    })
    return djs
  }

  onMounted(() => {
    const modeler1 = bootstrapDiagram('canvas1', [ContextPad])
    const modeler2 = bootstrapDiagram('canvas2', [
      {
        ...ContextPad,
        contextPad: ['type', RewriteContextPad]
      }
    ])

    bootstrapShapes(modeler1.get('canvas'))
    bootstrapShapes(modeler2.get('canvas'))
  })
</script>

<template>
  <div class="context-pad-box">
    <div id="canvas1" class="canvas"></div>
    <div id="canvas2" class="canvas"></div>
  </div>
  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style>
  .context-pad-box {
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
  .bg-gray {
    background-color: #888888;
  }
</style>
