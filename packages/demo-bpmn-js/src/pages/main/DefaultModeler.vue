<script setup>
  import { onMounted } from 'vue'
  import Modeler from 'bpmn-js/lib/Modeler'

  let modeler = null

  onMounted(() => {
    modeler = new Modeler({
      container: '#modeler-content'
    })

    modeler.createDiagram()
  })
</script>

<template>
  <div id="modeler-content" class="canvas modeler-content"></div>
</template>
