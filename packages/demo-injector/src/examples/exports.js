import { Injector } from 'didi'

const injector = new Injector([
  {
    __exports__: ['publicFoo'],
    publicFoo: [
      'factory',
      function (privateBar) {
        return {
          dependency: privateBar
        }
      }
    ],
    privateBar: ['value', 'private-value']
  },
  {
    bar: [
      'factory',
      function (privateBar) {
        return null
      }
    ],
    baz: [
      'factory',
      function (publicFoo) {
        return {
          dependency: publicFoo
        }
      }
    ]
  }
])

console.log(injector)
try {
  console.log(injector.get('publicFoo'))
} catch (e) {
  console.log(e)
}
try {
  console.log(injector.get('privateBar'))
} catch (e) {
  console.log(e)
}
try {
  console.log(injector.get('bar'))
} catch (e) {
  console.log(e)
}
try {
  console.log(injector.get('baz'))
} catch (e) {
  console.log(e)
}
