export class DemoContextPadProvider {
  constructor(contextPad) {
    contextPad.registerProvider(this)
  }
  getContextPadEntries() {
    return {
      'tool-one': {
        group: 'tools',
        className: 'tool-item LikeActive',
        title: '工具 1',
        action: {
          click() {
            window.alert('使用工具1')
          }
        }
      },
      'element-one': {
        group: 'elements',
        className: 'element-creator CutePetReportActive',
        title: '元素 1',
        action: {
          click() {
            window.alert('创建元素1')
          }
        }
      }
    }
  }
}
DemoContextPadProvider.$inject = ['contextPad']

export class DemoContextPadProvider2 {
  constructor(config, contextPad) {
    this._config = config
    this._contextPad = contextPad
    contextPad.registerProvider(this)
  }
  getContextPadEntries() {
    const config = this._config
    const contextPad = this._contextPad

    return {
      'tool-one': {
        group: 'tools',
        className: 'tool-item EmotionalMutualAssistanceActive',
        title: '新工具 111111111111111111111111111111111111',
        action: {
          click() {
            window.alert('使用 新的工具1')
          }
        }
      },
      'tool-two': {
        group: 'tools11111111111111111111111111111111111111',
        className: 'tool-item EmotionalMutualAssistanceActive',
        title: '切换ContextPad样式',
        action: {
          click() {
            contextPad.toggleStyles && contextPad.toggleStyles()
          }
        }
      },
      'element-two': {
        group: 'elements',
        className: 'element-creator FinancialExchangeActive',
        title: '元素 222222222222222222222222222222222222222222222',
        action: {
          click() {
            window.alert('创建元素2')
          }
        }
      },
      'element-three': {
        group: 'elements',
        className: 'element-creator FinancialExchangeActive',
        title: '元素 3',
        action: {
          click() {
            window.alert('创建元素3')
          }
        }
      },
      'element-four': {
        group: 'elements',
        className: 'element-creator FinancialExchangeActive',
        title: '元素 4',
        action: {
          click() {
            window.alert('创建元素4')
          }
        }
      },
      'event-one': {
        group: 'events',
        className: 'events FishingAtWorkActive',
        title: '事件1',
        action: {
          click() {
            if (config.componentMethods) {
              config.componentMethods.toggleDialog()
            }
          }
        }
      }
    }
  }
}
DemoContextPadProvider2.$inject = ['config', 'contextPad']
