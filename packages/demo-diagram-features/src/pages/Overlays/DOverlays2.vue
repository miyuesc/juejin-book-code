<script setup>
  import { onMounted, shallowRef, unref } from 'vue'
  import Diagram from 'diagram-js'
  import { bootstrapShapes } from '../../utils/bootstrap.js'
  import TouchModule from 'diagram-js/lib/features/touch'
  import SelectionModule from 'diagram-js/lib/features/selection'

  let shapes, modeler

  const activeElementIds = ['s1', 's3']

  const bootstrapDiagram = () => {
    return new Diagram({
      canvas: { container: document.getElementById('overlay-canvas') },
      modules: [TouchModule, SelectionModule]
    })
  }

  // 实现 类 tooltip
  const activeEl = shallowRef(null)
  const popoverRef = shallowRef(null)

  let timer = null
  let hoverEl = null

  const stopTimer = () => {
    timer && clearTimeout(timer)
  }
  const startTimer = () => {
    activeEl.value = null
    stopTimer()
    timer = setTimeout(() => {
      popoverRef.value && unref(popoverRef).popperRef?.delayHide?.()
    }, 2000)
  }
  const initHoverEvent = (eventBus) => {
    eventBus.on('element.hover', ({ element }) => {
      if (element.isImplicit) {
        return startTimer()
      }
      stopTimer()
      console.log(element)
      if (!hoverEl || hoverEl !== element) {
        hoverEl = element
        activeEl.value = modeler.get('elementRegistry').getGraphics(element.id)
      }
    })
  }

  onMounted(() => {
    modeler = bootstrapDiagram()
    shapes = bootstrapShapes(modeler.get('canvas'))

    initHoverEvent(modeler.get('eventBus'))
  })
</script>

<template>
  <div class="overlays-box">
    <div id="overlay-canvas" class="canvas"></div>
    <div class="box">
      <el-popover ref="popoverRef" :virtual-ref="activeEl" trigger="hover" title="With title" virtual-triggering>
        <p>This is a ElPopover</p>
        <p>使用 element-plus 实现</p>
      </el-popover>
    </div>
  </div>
</template>

<style>
  .overlays-box {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .overlay-box-mask {
    display: none;
  }
  .canvas {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
</style>
