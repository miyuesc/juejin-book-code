import { Injector } from 'didi'

const moduleParent = {
  b: [
    'factory',
    function (c) {
      return { c: c }
    }
  ],
  c: ['value', 'c-parent']
}
const injector = new Injector([moduleParent])

console.log(injector.get('b'))

const moduleChild = {
  c: ['value', 'c-child']
}

const child = injector.createChild([moduleChild], ['b'])

console.log(child.get('b'))
console.log(injector.get('b'))
