import { Injector } from 'didi'

function Car(engine) {
  this.start = function () {
    engine.start()
  }
}

function ChildCar(engine) {
  this.start = function () {
    console.log('child car')
    engine.start()
  }
}

function createPetrolEngine(power) {
  return {
    start: function () {
      console.log('Starting engine with ' + power + 'hp')
    }
  }
}

const power = 1184

const carModule = {
  car: ['type', Car],
  engine: ['factory', createPetrolEngine],
  power: ['value', power]
}

const injector = new Injector([carModule])

const child = injector.createChild([{ car: ['type', ChildCar] }])

child.get('car').start()
injector.get('car').start()

console.log(child.get('car') === injector.get('car'))
console.log(child.get('engine') === injector.get('engine'))
