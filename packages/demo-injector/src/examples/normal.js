import { Injector } from 'didi'

function Car(engine) {
  this.start = function () {
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

console.log(injector)
