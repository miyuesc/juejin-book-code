import { Injector } from 'didi'

class FooType {
  constructor() {
    this.fooIns = 'Foo instance'
  }
}

const injector = new Injector([
  {
    foo: ['type', FooType]
  }
])

console.log(injector.get('foo'))

const annotatedFn = [
  'foo',
  'bar',
  function (foo, bar) {
    console.log(foo)
    console.log(bar)
    console.log(foo === injector.get('foo'))
  }
]

injector.invoke(annotatedFn, null, { foo: new FooType(), bar: undefined })
