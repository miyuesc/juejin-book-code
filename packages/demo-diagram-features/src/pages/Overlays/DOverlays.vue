<script setup>
  import { onMounted, ref, unref } from 'vue'
  import Diagram from 'diagram-js'
  import { bootstrapShapes } from '../../utils/bootstrap.js'
  import TouchModule from 'diagram-js/lib/features/touch'
  import SelectionModule from 'diagram-js/lib/features/selection'
  import OverlaysModule from 'diagram-js/lib/features/overlays'

  let overlays,
    shapes,
    modeler,
    shapeOverlays = {}

  const htmlRef1 = ref(null)
  const htmlRef2 = ref(null)
  const htmlRef3 = ref(null)
  const htmlRef4 = ref(null)

  const intervalNum = ref(0)
  const show = ref(false)

  const bootstrapDiagram = () => {
    return new Diagram({
      canvas: { container: document.getElementById('overlay-canvas') },
      modules: [TouchModule, SelectionModule, OverlaysModule]
    })
  }

  const addOverlays = () => {
    toggleVisible()
    shapeOverlays.s1 = overlays.add(shapes.s1, { html: htmlRef1.value, position: { left: 100, top: 100 } })
    shapeOverlays.s2 = overlays.add(shapes.s2, { html: htmlRef2.value, position: { left: 0, top: 0 } })
    shapeOverlays.s3 = overlays.add(shapes.s2, { html: htmlRef3.value, position: { left: 100, top: 50 } })
  }
  const removeOverlays = (eleId) => {
    overlays.remove({ element: shapes[eleId] })
  }
  const clearOverlays = () => {
    overlays.clear()
  }

  const canvasScale = (scale) => {
    // modeler.get('canvas').zoom(scale)
    modeler.get('canvas').zoom(scale, { left: 0, top: 0 })
  }

  const toggleVisible = () => {
    show.value = !show.value
  }

  onMounted(() => {
    modeler = bootstrapDiagram()
    overlays = modeler.get('overlays')
    shapes = bootstrapShapes(modeler.get('canvas'))

    setInterval(() => intervalNum.value++, 2000)
  })
</script>

<template>
  <div class="overlays-box">
    <div id="overlay-canvas" class="canvas"></div>
    <div class="box">
      <div class="buttons">
        <el-button type="primary" @click="addOverlays">插入覆盖物</el-button>
        <el-button type="primary" @click="removeOverlays('s1')">移除s1覆盖物</el-button>
        <el-button type="primary" @click="removeOverlays('s2')">移除s2覆盖物</el-button>
        <el-button type="primary" @click="clearOverlays()">移除所有覆盖物</el-button>
        <el-button type="primary" @click="toggleVisible()">覆盖物动画</el-button>
      </div>
      <div class="buttons">
        <el-button type="primary" @click="canvasScale(1.5)">放大画布</el-button>
        <el-button type="primary" @click="canvasScale(0.5)">缩小画布</el-button>
        <el-button type="primary" @click="canvasScale(1)">重置画布</el-button>
      </div>
      <div ref="htmlRef1" class="overlay-box">
        <el-button type="primary">Primary Button</el-button>
        <el-button type="primary">Primary Button</el-button>
        <el-button type="primary">Primary Button</el-button>
      </div>
      <div ref="htmlRef2" class="overlay-box">
        <el-input-number v-model="intervalNum" />
      </div>
      <div ref="htmlRef3" class="overlay-box">
        <transition name="el-zoom-in-top">
          <div v-show="show" class="transition-box">.el-zoom-in-top</div>
        </transition>
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

  .canvas {
    width: 100%;
    height: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .buttons {
    box-sizing: border-box;
    padding: 20px;
  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409eff;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
