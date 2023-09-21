import { Injector } from 'didi'

function Car(engine) {
  this.start = function () {
    engine.start()
  }
}

function Driver() {
  this.drive = function () {
    console.log('The driver started driving')
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

const driverModule = {
  driver: ['type', Driver]
}

const carModule = {
  __depends__: [driverModule],
  car: ['type', Car],
  engine: ['factory', createPetrolEngine],
  power: ['value', power]
}

const injector = new Injector([carModule])

console.log(injector)

injector.get('car').start()

injector.invoke(function (car) {
  console.log('started', car)
})
