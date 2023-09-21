<script setup>
  import { onMounted, ref } from 'vue'
  import Diagram from 'diagram-js'
  import Modeler from 'bpmn-js/lib/Modeler'
  import Palette from 'diagram-js/lib/features/palette'
  import { DemoPaletteProvider, DemoPaletteProvider2, DemoPaletteProvider3 } from '../../modules/paletteProviders.js'

  const dialogVisible = ref(false)
  const toggleDialog = () => {
    dialogVisible.value = !dialogVisible.value
  }

  onMounted(() => {
    const djs = new Diagram({
      canvas: { container: document.getElementById('canvas') },
      modules: [
        Palette,
        {
          __init__: ['demoPaletteProvider', 'demoPaletteProvider2'],
          demoPaletteProvider: ['type', DemoPaletteProvider],
          demoPaletteProvider2: ['type', DemoPaletteProvider2]
        }
      ],
      componentMethods: {
        toggleDialog
      }
    })

    // const modeler = new Modeler({
    //   container: '#canvas',
    //   additionalModules: [
    //     {
    //       __init__: ['demoPaletteProvider'],
    //       demoPaletteProvider: ['type', DemoPaletteProvider]
    //     }
    //   ]
    // })
  })
</script>

<template>
  <div id="canvas" class="canvas"></div>
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
  .canvas {
    width: 100%;
    height: 100%;
  }
  .bg-gray {
    background-color: #888888;
  }
</style>
