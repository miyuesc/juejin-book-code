import { Injector } from 'didi'

class BazType {
  constructor() {
    this.name = 'baz'
  }
}

const injector = new Injector([
  {
    foo: [
      'factory',
      function () {
        return {
          name: 'foo'
        }
      }
    ],
    bar: ['value', 'bar value'],
    baz: ['type', BazType]
  }
])

console.log(injector.get('foo'))
console.log(injector.get('bar'))
console.log(injector.get('baz'))
console.log(injector.get('foo') === injector.get('foo'))
