<script setup>
  import { onMounted } from 'vue'
  import Editor from '../../modules/Editor.js'
  import bootstrapShapes from '../../utils/bootstrap-shapes.js'

  let modeler = null

  onMounted(() => {
    modeler = new Editor({
      container: document.getElementById('modeler-content')
    })

    // bootstrapShapes(modeler)
  })
</script>

<template>
  <div id="modeler-content" class="canvas modeler-content"></div>
</template>
