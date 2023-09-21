import { Injector } from 'didi'
const loaded = []

const injector = new Injector([
  {
    __exports__: ['foo', 'bar'],
    __modules__: [
      {
        __init__: [() => loaded.push('nested')],
        bar: ['value', 10]
      }
    ],
    __init__: [(bar) => loaded.push('module' + bar)],
    foo: [
      'factory',
      function (bar) {
        return bar
      }
    ]
  }
])

// when
injector.init()

console.log(injector)
console.log(injector.get('foo'))
console.log(injector.get('bar'))
