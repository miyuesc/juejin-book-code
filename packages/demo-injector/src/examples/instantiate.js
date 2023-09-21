import { Injector } from 'didi'

const returnedObj = {}
function ObjCls() {
  return returnedObj
}
function StringCls() {
  return 'some string'
}
function NumberCls() {
  return 123
}

class Foo {
  constructor(abc1, baz1) {
    this.abc = abc1
    this.baz = baz1
  }
}
Foo.$inject = ['abc', 'baz']

const module = {
  baz: ['value', 'baz-value'],
  abc: ['value', 'abc-value']
}

const injector = new Injector([module])

console.log(injector.instantiate(Foo))
console.log(injector.instantiate(ObjCls))
console.log(injector.instantiate(StringCls))
console.log(injector.instantiate(NumberCls))
console.log(injector)
