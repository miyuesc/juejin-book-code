export function createStack() {
  const stack = []

  Object.defineProperty(stack, 'peek', {
    value: function () {
      return this[this.length - 1]
    }
  })

  return stack
}
