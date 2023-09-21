<script setup>
  import { onMounted } from 'vue'
  import { addTwoRoot, removeRootElement, initDiagram, removeMarker, toggleMarker, getLayers, toggleLayers } from './examples/canvas.js'
  import {
    initFactoryAndRegistry,
    secondaryGfxUtil,
    queryMethods,
    updateMethods,
    addAndRemove,
    graphicsUpdate,
    graphicsRemove,
    graphicsClear
  } from './examples/factoryAndRegistry.js'

  // const toggleLayer = toggleLayers()

  onMounted(() => {
    document.addEventListener('fullscreenchange', function (event) {
      console.log(22222222222)
    })
    const diagram = initDiagram()

    diagram.get('eventBus').on('element.updateId', (event) => {
      event.stopPropagation()
      event.preventDefault()
      return false
    })

    console.log(diagram)

    const styles = diagram.get('styles')

    console.log(styles.style(['no-fill'], { strokeWidth: 5, stroke: 'fuchsia' }))
    console.log(styles.style({ fill: 'white', stroke: 'fuchsia', strokeWidth: 2 }))
    console.log(styles.cls('class1', ['no-events', 'no-fill'], { fill: 'white', strokeWidth: 2 }))
    console.log(styles.cls('class2', { fill: 'white', stroke: 'fuchsia' }))
    console.log(styles.computeStyle({ cursor: 'pointer' }, ['no-events', 'no-fill'], { fill: 'black', strokeWidth: 10 }))
    console.log(styles.computeStyle({ cursor: 'pointer' }, { fill: 'black', stroke: 'fuchsia' }))

    initFactoryAndRegistry(diagram)
  })
</script>

<template>
  <div class="main-container">
    <div class="buttons">
      <span>Canvas 相关</span>
      <button @click="removeRootElement">移除根元素</button>
      <button @click="removeMarker">移除 class</button>
      <button @click="toggleMarker">切换 class</button>
      <button @click="addTwoRoot">添加两个 root</button>
      <button @click="getLayers">获取图层</button>
      <button @click="toggleLayers()">切换显示图层</button>
    </div>
    <div class="buttons">
      <span>ElementRegistry 相关</span>
      <button @click="secondaryGfxUtil">次级元素</button>
      <button @click="queryMethods">查询类方法</button>
      <button @click="updateMethods">更新类方法</button>
      <button @click="addAndRemove">添加和移除</button>
    </div>
    <div class="buttons">
      <span>GraphicsFactory 相关</span>
      <button @click="graphicsUpdate">update 更新</button>
      <button @click="graphicsRemove">remove 移除</button>
      <button @click="graphicsClear">clear 清空</button>
    </div>
    <div id="container"></div>
  </div>
</template>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .buttons {
    width: 100%;
  }
  .buttons button + button {
    margin-left: 12px;
  }
  #container {
    width: 100%;
    height: 100%;
  }
</style>
