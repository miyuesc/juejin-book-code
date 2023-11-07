/**
 * A example context pad provider.
 */
export default function ExampleContextPadProvider(connect, contextPad, modeling, elementFactory, create, autoPlace) {
  this._connect = connect
  this._modeling = modeling
  this._elementFactory = elementFactory
  this._autoPlace = autoPlace
  this._create = create

  contextPad.registerProvider(this)
}

ExampleContextPadProvider.$inject = ['connect', 'contextPad', 'modeling', 'elementFactory', 'create', 'autoPlace']

ExampleContextPadProvider.prototype.getContextPadEntries = function (element) {
  var connect = this._connect,
    elementFactory = this._elementFactory,
    autoPlace = this._autoPlace,
    create = this._create,
    modeling = this._modeling

  function removeElement() {
    modeling.removeElements([element])
  }

  function startConnect(event, element, autoActivate) {
    connect.start(event, element, autoActivate)
  }

  function appendElement(event) {
    const shape = elementFactory.createShape({
      width: 100,
      height: 80
    })

    create.start(event, shape)
  }

  function appendStart(event) {
    const shape = elementFactory.createShape({
      width: 100,
      height: 80
    })

    autoPlace.append(element, shape)
  }

  return {
    delete: {
      group: 'edit',
      className: 'context-pad-icon-remove',
      title: 'Remove',
      action: {
        click: removeElement,
        dragstart: appendElement
      }
    },
    append: {
      group: 'append',
      className: 'context-pad-icon-append',
      title: 'Append',
      action: {
        click: autoPlace ? appendStart : appendElement,
        dragstart: appendElement
      }
    },
    connect: {
      group: 'edit',
      className: 'context-pad-icon-connect',
      title: 'Connect',
      action: {
        click: startConnect,
        dragstart: startConnect
      }
    }
  }
}
