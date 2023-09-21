export class DemoPaletteProvider {
  constructor(palette) {
    palette.registerProvider(this)
  }
  getPaletteEntries() {
    return {
      'tool-one': {
        group: 'tools',
        className: 'tool-item',
        title: '工具 1',
        action: {
          click() {
            window.alert('使用工具1')
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'element-one': {
        group: 'elements',
        className: 'element-creator',
        title: '元素 1',
        action: {
          click() {
            window.alert('创建元素1')
          }
        }
      },
      'element-separator': {
        group: 'elements',
        separator: true
      }
    }
  }
}
DemoPaletteProvider.$inject = ['palette']

export class DemoPaletteProvider2 {
  constructor(config, palette) {
    this._config = config
    palette.registerProvider(this)
  }
  getPaletteEntries() {
    const config = this._config

    return {
      'tool-one': {
        group: 'tools',
        className: 'tool-item',
        title: '新工具 1',
        action: {
          click() {
            window.alert('使用 新的工具1')
          }
        }
      },
      'element-two': {
        group: 'elements',
        className: 'element-creator',
        title: '元素 2',
        action: {
          click() {
            window.alert('创建元素2')
          }
        }
      },
      'event-one': {
        group: 'events',
        className: 'events bg-gray',
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
DemoPaletteProvider2.$inject = ['config', 'palette']

export class DemoPaletteProvider3 extends DemoPaletteProvider {
  constructor(palette) {
    super(palette)
  }
  getPaletteEntries() {
    const actions = super.getPaletteEntries()
    delete actions['element-separator']
    return actions
  }
}
DemoPaletteProvider3.$inject = ['palette']
