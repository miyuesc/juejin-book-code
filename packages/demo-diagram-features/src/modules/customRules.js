import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider'

class CustomRules extends RuleProvider {
  constructor(eventBus) {
    super(eventBus)
  }

  init() {
    this.addRule('elements.move', function (context) {
      const { shapes, target } = context

      if (shapes.indexOf((i) => i.id === 's1') > -1) {
        return false
      }

      if (target && target.id === 's3') {
        return false
      }
    })
  }
}

CustomRules.$inject = ['eventBus']

export default {
  __init__: ['customRules'],
  customRules: ['type', CustomRules]
}
