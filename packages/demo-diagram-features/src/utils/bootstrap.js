export const bootstrapShapes = (canvas) => {
  const s1 = canvas.addShape({ id: 's1', width: 100, height: 100, x: 10, y: 10 })
  const s2 = canvas.addShape({ id: 's2', width: 50, height: 50, x: 200, y: 10 })
  const s3 = canvas.addShape({ id: 's3', width: 150, height: 150, x: 300, y: 300 })

  const c1 = canvas.addConnection({
    id: 'c1',
    waypoints: [
      { x: 100, y: 100 },
      { x: 200, y: 200 }
    ]
  })
  const c2 = canvas.addConnection({
    id: 'c2',
    waypoints: [
      { x: 400, y: 400 },
      { x: 320, y: 240 },
      { x: 240, y: 320 }
    ]
  })

  return { s1, s2, s3, c1, c2 }
}
