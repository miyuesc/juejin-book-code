export const bootstrapShapes = (canvas) => {
  const s1 = canvas.addShape({ id: 's1', width: 100, height: 100, x: 10, y: 10 })
  const s2 = canvas.addShape({ id: 's2', width: 50, height: 50, x: 200, y: 10 })
  const s3 = canvas.addShape({ id: 's3', width: 150, height: 150, x: 300, y: 300 })

  return { s1, s2, s3 }
}
