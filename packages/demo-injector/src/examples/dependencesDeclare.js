import { Injector } from 'didi'

class Foo {
  constructor() {
    this.fooIns = 'Foo instance'
  }
}

class Bar {
  constructor(foo) {
    this.foo = foo
    this.bar = 'bar'
  }
}
Bar.$inject = ['foo']

class Baz {
  constructor(/* bar */ a) {
    this.bar = a
    this.baz = 'baz'
  }
}

class Car {
  constructor(bar, baz, foo) {
    this.car = 'car'
    this.bar = bar
    this.baz = baz
    this.foo = foo
  }
}

function invokeBar(/* bar */ bar) {
  console.log('invoke bar', bar)
}

function invokeBaz(baz) {
  console.log('invoke baz', baz)
}
invokeBaz.$inject = ['baz']

const modules = [
  {
    __init__: ['invokeBar', 'invokeBaz'],
    foo: ['type', Foo],
    bar: ['type', Bar],
    baz: ['type', Baz],
    car: ['type', ['bar', 'baz', 'foo', Car]],
    invokeBar: ['factory', invokeBar],
    invokeBaz: ['factory', invokeBaz]
  }
]

const injector = new Injector(modules)
injector.init()

console.log(injector.get('car'))
console.log(injector)
