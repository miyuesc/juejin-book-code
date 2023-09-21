import { create as svgCreate } from 'tiny-svg'

let diagram, elementRegistry, graphicsFactory, elementFactory, canvas

export function initFactoryAndRegistry(d) {
  diagram = d
  elementRegistry = diagram.get('elementRegistry')
  graphicsFactory = diagram.get('graphicsFactory')
  elementFactory = diagram.get('elementFactory')
  canvas = diagram.get('canvas')

  console.log(canvas)
  console.log(elementRegistry._elements)

  canvas.addShape({ id: '1', type: 'FOOO', x: 10, y: 20, width: 40, height: 40 })
  canvas.addShape({ id: '2', type: 'BAR', x: 100, y: 200, width: 40, height: 40 })
}

export function secondaryGfxUtil() {
  const shape = elementRegistry.get('1')
  const newGfx = graphicsFactory.create('shape', shape)
  const secondaryGfx = elementRegistry.updateGraphics(shape, newGfx, true)

  console.log('secondaryGfx', secondaryGfx)
  console.log('getGraphics', elementRegistry.getGraphics(shape, true))
}

export function queryMethods() {
  console.log(elementRegistry.get('1'))
  console.log(elementRegistry.getGraphics('2'))
  console.log(elementRegistry.get(elementRegistry.getGraphics('2')))
  console.log(elementRegistry.getAll())
}

export function updateMethods() {
  elementRegistry.updateId('1', 'new-1')

  const shape2 = elementRegistry.get('2')
  const newGfx = svgCreate('react', {
    fill: '#010101',
    width: 200,
    height: 200,
    x: 40,
    y: 40
  })
  console.log(elementRegistry.updateGraphics(shape2, newGfx))
  console.log(elementRegistry._elements)
}

export function addAndRemove() {
  const el = { id: 'new-add-1', x: 10, y: 20, width: 40, height: 40 }
  canvas._setParent(el, canvas.getRootElement())
  const gfx = graphicsFactory.create('shape', el)

  elementRegistry.add(el, gfx)

  elementRegistry.remove('1')

  console.log(gfx, elementRegistry)
}

export function graphicsUpdate() {
  const el1 = { id: 'new-add-1', x: 10, y: 200, width: 40, height: 40 }
  canvas._setParent(el1, canvas.getRootElement())
  const gfx1 = graphicsFactory.create('shape', el1)

  const el2 = { id: 'new-add-2', x: 100, y: 20, width: 40, height: 40, hidden: true }
  canvas._setParent(el2, canvas.getRootElement())
  const gfx2 = graphicsFactory.create('shape', el2)

  const el3 = { id: 'new-child-3', x: 100, y: 20, width: 10, height: 10 }
  canvas._setParent(el3, elementRegistry.get('1'))
  // canvas._setParent(el3, el1) // 因为 el1 无法在 elementRegistry 中查询到，所以会报错
  const gfx3 = graphicsFactory.create('shape', el3)

  graphicsFactory.update('shape', el1, gfx1)
  graphicsFactory.update('shape', el2, gfx2)
  graphicsFactory.update('shape', el3, gfx3)

  // console.log(elementRegistry)
}

export function graphicsRemove() {
  graphicsFactory.remove('1')
  console.log(elementRegistry)
}

export function graphicsClear() {
  graphicsFactory._clear(elementRegistry.getGraphics('2'))
  console.log(elementRegistry)
}
