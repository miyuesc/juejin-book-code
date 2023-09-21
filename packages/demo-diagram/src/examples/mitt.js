import mitt from 'mitt'
const eventBus = mitt()

eventBus.on('ev1', () => console.log('no 1, event type 1'))
eventBus.on('ev2', () => console.log('no 2, event type 2'))
eventBus.on('ev2', () => console.log('no 1, event type 2'))
eventBus.on('ev1', () => console.log('no 2, event type 1'))
eventBus.on('*', () => console.log('no 2, event type all'))
eventBus.on('*', () => console.log('no 1, event type all'))

eventBus.emit('ev1')
console.log('--------------------')
eventBus.emit('ev2')
console.log('--------------------')
eventBus.emit('*')
console.log('--------------------')

console.log(eventBus)
