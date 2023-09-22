<script setup>
  import { onMounted, shallowRef } from 'vue'
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
  const activeSvgEl = shallowRef(null)
  const popoverRef = shallowRef(null)
  const hoverEl = shallowRef(null)

  const initHoverEvent = (eventBus) => {
    eventBus.on('element.hover', ({ element, gfx }) => {
      if (element && activeElementIds.indexOf(element.id) >= 0) {
        if (!hoverEl.value || hoverEl.value !== element) {
          hoverEl.value = element
          // activeSvgEl.value = modeler.get('elementRegistry').getGraphics(element.id)
          activeSvgEl.value = gfx
        }
      }
    })
  }

  const clearPopover = () => {
    activeSvgEl.value = null
    hoverEl.value = null
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
      <el-popover ref="popoverRef" :virtual-ref="activeSvgEl" trigger="hover" title="With title" virtual-triggering @hide="clearPopover">
        <p>This is a ElPopover</p>
        <p>使用 element-plus 实现</p>
        <p v-if="hoverEl">Hover 元素 ID: {{ hoverEl.id }}</p>
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
