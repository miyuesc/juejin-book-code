<script setup>
  import { onMounted, ref, unref } from 'vue'
  import Diagram from 'diagram-js'
  import modelingModule from 'diagram-js/lib/features/modeling'
  import moveModule from 'diagram-js/lib/features/move'
  import dragModule from 'diagram-js/lib/features/dragging'
  import createModule from 'diagram-js/lib/features/create'
  import attachSupportModule from 'diagram-js/lib/features/attach-support'
  import connectionPreviewModule from 'diagram-js/lib/features/connection-preview'

  const bootstrapDiagram = () => {
    return new Diagram({
      canvas: { container: document.getElementById('create-canvas') },
      modules: [createModule, attachSupportModule, modelingModule, moveModule, dragModule, connectionPreviewModule]
    })
  }

  let djs, rootShape, parentShape, hostShape, childShape, frameShape, ignoreShape, newShape, newShape2, newElements, hiddenShape
  const setManualDragging = (dragging) => {
    dragging.setOptions({ manual: true })
  }

  const setupDiagram = (elementFactory, canvas) => {
    rootShape = elementFactory.createRoot({
      id: 'root'
    })
    canvas.setRootElement(rootShape)

    parentShape = elementFactory.createShape({
      id: 'parentShape',
      x: 100,
      y: 100,
      width: 300,
      height: 200
    })

    canvas.addShape(parentShape, rootShape)

    hostShape = elementFactory.createShape({
      id: 'hostShape',
      x: 450,
      y: 250,
      width: 100,
      height: 100
    })

    canvas.addShape(hostShape, rootShape)

    childShape = elementFactory.createShape({
      id: 'childShape',
      x: 600,
      y: 250,
      width: 100,
      height: 100
    })

    canvas.addShape(childShape, rootShape)

    frameShape = elementFactory.createShape({
      id: 'frameShape',
      x: 450,
      y: 100,
      width: 100,
      height: 100,
      isFrame: true
    })

    canvas.addShape(frameShape, rootShape)

    ignoreShape = elementFactory.createShape({
      id: 'ignoreShape',
      x: 600,
      y: 100,
      width: 100,
      height: 100
    })

    canvas.addShape(ignoreShape, rootShape)

    newShape = elementFactory.createShape({
      id: 'newShape',
      width: 50,
      height: 50
    })

    newElements = []

    newShape2 = elementFactory.createShape({
      id: 'newShape2',
      width: 50,
      height: 50
    })

    newElements.push(newShape2)

    var newShape3 = elementFactory.createShape({
      id: 'newShape3',
      x: 100,
      y: -25,
      width: 100,
      height: 100
    })

    newElements.push(newShape3)

    newElements.push(
      elementFactory.createShape({
        id: 'newShape4',
        parent: newShape2,
        x: 100,
        y: -25,
        width: 100,
        height: 100
      })
    )

    newElements.push(
      elementFactory.createConnection({
        id: 'newConnection',
        source: newShape2,
        target: newShape3,
        waypoints: [
          { x: 50, y: 25 },
          { x: 100, y: 25 }
        ]
      })
    )

    hiddenShape = elementFactory.createShape({
      id: 'hiddenShape',
      x: 1000,
      y: 100,
      width: 100,
      height: 100,
      hidden: true
    })

    newElements.push(hiddenShape)
  }

  onMounted(() => {
    djs = bootstrapDiagram()
    setupDiagram(djs.get('elementFactory'), djs.get('canvas'))
  })
</script>

<template>
  <div class="create-box">
    <div id="create-canvas" class="canvas"></div>
  </div>
</template>

<style scoped>
  .create-box {
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
