<script setup>
  import { onMounted } from 'vue'
  import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer'
  import { collaborationXML } from '../utils/bootstrap.js'

  let viewer = null

  onMounted(async () => {
    viewer = new NavigatedViewer({
      container: '#viewer-content'
    })

    await viewer.importXML(collaborationXML)
  })
</script>

<template>
  <div id="viewer-content" class="canvas viewer-content"></div>
</template>
