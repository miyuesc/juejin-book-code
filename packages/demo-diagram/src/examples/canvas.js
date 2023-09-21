import Diagram from 'diagram-js'
import CustomStyles from '../examples/CustomStyles.js'

let diagram, canvas

export function initDiagram() {
  diagram = new Diagram({
    canvas: { container: document.getElementById('container') },
    modules: [{ styles: ['type', CustomStyles] }],
    styles: {
      red: { fill: 'red' }
    }
  })
  canvas = diagram.get('canvas')
  return diagram
}

export function addTwoRoot() {
  const rootA = canvas.addRootElement({ id: 'a' })
  const rootB = canvas.addRootElement({ id: 'b' })

  const rootElements = canvas.getRootElements()

  console.log(rootElements)

  return rootElements
}

export function getGraphics() {
  const parentShape = canvas.addShape({ id: 'parent', x: 100, y: 100, width: 300, height: 300 })
  const child1Shape = canvas.addShape({ id: 'child1', x: 110, y: 110, width: 100, height: 100 }, parentShape)
  const child2Shape = canvas.addShape({ id: 'child2', x: 300, y: 110, width: 100, height: 100 }, parentShape)

  console.log(canvas.getGraphics(child1Shape))
  console.log(canvas.getGraphics(parentShape))
  console.log(canvas.getGraphics(parentShape, true))
}

export function setRootElement(root) {
  canvas.setRootElement(root)
}

export function removeRootElement() {
  const root = canvas.getRootElement()
  canvas.removeRootElement(root)
}

export function addMarker() {
  const canvas = diagram.get('canvas')
  canvas.addMarker('parent', 'red')
  canvas.addMarker('child1', 'blue')
  canvas.addMarker('child1', 'child1')
  canvas.addMarker('child2', 'green')
  canvas.addMarker('child2', 'child2')
}

export function removeMarker() {
  canvas.removeMarker('child1', 'child1')
  canvas.removeMarker('child2', 'green')
}

export function toggleMarker() {
  canvas.toggleMarker('parent', 'red')
  canvas.toggleMarker('child1', 'blue')
  canvas.toggleMarker('child2', 'child2')
}

export function getLayers() {
  console.log(canvas._layers)
  return canvas._layers
}

let layerStatus = true

export function toggleLayers() {
  layerStatus ? canvas.hideLayer('root-0') : canvas.showLayer('root-0')
  layerStatus = !layerStatus
}
