<script setup>
  import { onMounted, ref } from 'vue'
  import Diagram from 'diagram-js'
  import { bootstrapShapes } from '../../utils/bootstrap.js'
  import TouchModule from 'diagram-js/lib/features/touch'
  import SelectionModule from 'diagram-js/lib/features/selection'
  import OverlaysModule from 'diagram-js/lib/features/overlays'

  let shapes, modeler, overlays

  const activeElementIds = ['s1', 's3']

  const bootstrapDiagram = () => {
    return new Diagram({
      canvas: { container: document.getElementById('overlay-canvas') },
      modules: [TouchModule, SelectionModule, OverlaysModule]
    })
  }

  // 实现 类 tooltip
  let hoverEl = null
  let timer = null
  const htmlRef = ref(null)

  const stopTimer = () => {
    timer && clearTimeout(timer)
  }
  const startTimer = () => {
    hoverEl = null
    stopTimer()
    timer = setTimeout(() => {
      overlays && overlays.clear()
    }, 2000)
  }
  const initHoverEvent = (eventBus) => {
    eventBus.on('element.hover', ({ element }) => {
      if (element.isImplicit) {
        return startTimer()
      }
      stopTimer()
      overlays && overlays.clear()
      if (!hoverEl || hoverEl !== element) {
        hoverEl = element
        overlays.add(hoverEl, { html: htmlRef.value, position: { left: element.width / 2, top: 0 } })
      }
    })
  }

  onMounted(() => {
    modeler = bootstrapDiagram()
    overlays = modeler.get('overlays')
    shapes = bootstrapShapes(modeler.get('canvas'))

    // initHoverEvent(modeler.get('eventBus'))
  })
</script>

<template>
  <div class="overlays-box">
    <div id="overlay-canvas" class="canvas"></div>
    <div class="box">
      <div class="overlay-box-mask">
        <div ref="htmlRef" class="djs-popover">
          <div class="djs-popover__content">
            <p>This is a popover</p>
            <p>使用 div 手动实现</p>
          </div>
          <div class="djs-popover__arrow-wrapper">
            <div class="djs-popover__arrow"></div>
          </div>
        </div>
      </div>
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
    //display: none;
    margin: 20vh auto;
  }
  .canvas {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .buttons {
    box-sizing: border-box;
    padding: 20px;
  }

  .djs-overlay {
    pointer-events: none;
  }
  .djs-popover {
    transform: translateX(-50%) translateY(-100%);
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
    color: rgb(51, 54, 57);
    background-color: rgb(255, 255, 255);
    padding: 8px 14px;
    margin-bottom: 10px;
  }
  .djs-popover__content {
    width: max-content;
    white-space: nowrap;
    pointer-events: all;
  }
  .djs-popover__arrow-wrapper {
    position: absolute;
    right: 0;
    left: 0;
    top: 100%;
    bottom: auto;
    height: 10px;
    overflow: hidden;
    pointer-events: none;
  }
  .djs-popover__arrow {
    position: absolute;
    display: block;
    width: calc(6px * 1.414);
    height: calc(6px * 1.414);
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
    background-color: #ffffff;
    pointer-events: all;
    top: calc(6px * 1.414 / -2);
    transform: translateX(calc(6px * 1.414 / -2)) rotate(45deg);
    left: 50%;
  }
</style>
