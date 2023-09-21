import Diagram from 'diagram-js'

export default function () {
  const diagram = new Diagram({ canvas: { container: document.getElementById('container') } })
  console.log(diagram)
}
