import { default as BaseContextPad } from 'diagram-js/lib/features/context-pad/ContextPad.js'
import { escapeCSS } from 'diagram-js/lib/util/EscapeUtil.js'
import { forEach, isArray } from 'min-dash'
import { attr as domAttr, query as domQuery, classes as domClasses, domify as domify, delegate as domDelegate, event as domEvent } from 'min-dom'

export default class ContextPad extends BaseContextPad {
  constructor(canvas, config, eventBus, overlays, translate) {
    super(canvas, config, eventBus, overlays)
  }
  _updateAndOpen(target) {
    if (!this._beauty) {
      delete this._overlaysConfig.html
      return super._updateAndOpen(target)
    }
    const padHtml = domify(`<div class="djs-context-pad wider-pad"></div>`)
    const entrySelector = '.entry'
    const self = this

    domDelegate.bind(padHtml, entrySelector, 'click', function (event) {
      self.trigger('click', event)
    })

    domDelegate.bind(padHtml, entrySelector, 'dragstart', function (event) {
      self.trigger('dragstart', event)
    })

    // stop propagation of mouse events
    domEvent.bind(padHtml, 'mousedown', function (event) {
      event.stopPropagation()
    })

    this._overlaysConfig.html = padHtml

    let entries = this.getEntries(target),
      pad = this.getPad(target),
      html = pad.html,
      image

    forEach(entries, function (entry, id) {
      let grouping = entry.group || 'default',
        icon = domify('<div class="entry__icon"></div>'),
        control = domify(entry.html || '<div class="entry" draggable="true"></div>'),
        container

      control.appendChild(icon)
      domAttr(control, 'data-action', id)

      container = domQuery('[data-group=' + escapeCSS(grouping) + ']', html)
      if (!container) {
        container = domify(`<div class="group"><div class="group__label">${grouping}</div></div>`)
        domAttr(container, 'data-group', grouping)

        html.appendChild(container)
      }

      container.appendChild(control)

      if (entry.className) {
        addClasses(icon, entry.className)
      }

      if (entry.title) {
        domAttr(control, 'title', entry.title)
        const title = domify(`<div class="entry__title">${entry.title}</div>`)
        control.appendChild(title)
      }

      if (entry.imageUrl) {
        image = domify(`<img alt="${entry.title}-image" />`)
        domAttr(image, 'src', entry.imageUrl)
        image.style.width = '100%'
        image.style.height = '100%'

        control.appendChild(image)
      }
    })

    domClasses(html).add('open')

    this._current = {
      target: target,
      entries: entries,
      pad: pad
    }

    this._eventBus.fire('contextPad.open', { current: this._current })
  }

  toggleStyles(beauty) {
    if (beauty != null) {
      this._beauty = beauty
    } else {
      this._beauty = !this._beauty
    }
    const target = this._current.target
    this.close()
    this.open(target)
    return this._beauty
  }
}

ContextPad.$inject = ['canvas', 'config.contextPad', 'eventBus', 'overlays']

function addClasses(element, classNames) {
  const classes = domClasses(element)

  classNames = isArray(classNames) ? classNames : classNames.split(/\s+/g)

  classNames.forEach(function (cls) {
    classes.add(cls)
  })
}
