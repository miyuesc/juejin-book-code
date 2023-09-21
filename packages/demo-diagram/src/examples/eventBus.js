import EventBus from 'diagram-js/lib/core/EventBus.js'

const eventBus = new EventBus()

const listener1 = function (e) {
  console.log('listener 1 fired', e)
}

const listener2 = function (e) {
  console.log('listener 2 fired', e)
}

const listener3 = function (e) {
  console.log('listener 3 fired', e)
  if (e.useReturn) {
    return {
      info: 'listener 3 return'
    }
  }
}

const listener4 = function (e) {
  console.log('listener 4 fired', e)
}

const listenerStopPropagation = function (e) {
  console.log('listener stop fired', e)
  e.stopPropagation()
}

// setup
eventBus.on('foo', 100, listener1)
eventBus.on('foo', 500, listener2)
eventBus.on('foo', 200, listener3)
eventBus.on('foo', 500, listener4)

console.log(eventBus.fire('foo', { data: '123123', type: 'xxx' }))

console.log('--------------------')

console.log(eventBus.fire('foo', { data: 'xxx', useReturn: true }))

console.log('--------------------')

eventBus.off('foo', listener2)
eventBus.on('foo', 300, listenerStopPropagation)

console.log(eventBus.fire('foo', { data: 'xxx', useReturn: true }))

export default eventBus
