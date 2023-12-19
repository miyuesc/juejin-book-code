<script setup>
  import { onMounted } from 'vue'
  import Modeler from 'bpmn-js/lib/Modeler'
  import { processXML } from '../utils/bootstrap.js'

  let modeler = null

  onMounted(async () => {
    modeler = new Modeler({
      container: '#modeler-content'
    })

    modeler.importXML(processXML)

    console.log(modeler)
  })
</script>

<template>
  <div id="modeler-content" class="canvas modeler-content"></div>
</template>
