export default function (diagram) {
  // (2) draw diagram elements (i.e. import)

  const canvas = diagram.get('canvas')
  const elementFactory = diagram.get('elementFactory')

  // add root
  const root = elementFactory.createRoot()

  canvas.setRootElement(root)

  // add shapes
  const shape1 = elementFactory.createShape({
    x: 150,
    y: 100,
    width: 100,
    height: 80
  })

  canvas.addShape(shape1, root)

  const shape2 = elementFactory.createShape({
    x: 290,
    y: 220,
    width: 100,
    height: 80
  })

  canvas.addShape(shape2, root)

  const connection1 = elementFactory.createConnection({
    waypoints: [
      { x: 250, y: 180 },
      { x: 290, y: 220 }
    ],
    source: shape1,
    target: shape2
  })

  canvas.addConnection(connection1, root)

  const shape3 = elementFactory.createShape({
    x: 450,
    y: 80,
    width: 100,
    height: 80
  })

  canvas.addShape(shape3, root)

  const shape4 = elementFactory.createShape({
    x: 425,
    y: 50,
    width: 300,
    height: 200,
    isFrame: true
  })

  canvas.addShape(shape4, root)

  // (3) interact with the diagram via API

  const selection = diagram.get('selection')

  selection.select(shape3)
}
