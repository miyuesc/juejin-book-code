import { assign } from 'min-dash'
import { is } from '../util/ModelUtil'
import { isLabelExternal, getExternalLabelBounds, getLabel } from '../util/LabelUtil'
import { getMid } from 'diagram-js/lib/layout/LayoutUtil'
import { isExpanded } from '../util/DiUtil'

/**
 * 这段代码是一个BPMN导入器，用于将BPMN模型导入到画布中。具体来说，它包含了以下功能：
 *
 * add函数：将BPMN元素和其对应的DI（图形信息）添加到画布中。根据不同的DI类型（bpmndi:BPMNPlane、bpmndi:BPMNShape、bpmndi:BPMNEdge），
 * 创建不同类型的元素（Root、Shape、Connection）并添加到画布中。
 *
 * _attachBoundary函数：将边界事件（Boundary Event）连接到它们的宿主元素上。
 *
 * addLabel函数：为元素添加标签（Label），并将标签添加到父元素中。
 *
 * _getConnectedElement函数：根据给定的语义（semantic）和方向（source/target），获取与之连接的元素。
 *
 * _getSource和_getTarget函数：分别获取连接关系的源元素和目标元素。
 *
 * _getElement函数：根据给定的语义（semantic）获取对应的元素。
 *
 * 此外，代码中还定义了一些辅助函数和常量。
 *
 * 具体的实现方式是通过操作画布（canvas）、元素工厂（elementFactory）、元素注册表（elementRegistry）等对象来实现的。
 * 根据不同的BPMN元素类型和DI类型，创建相应的元素对象，并将它们添加到画布中。同时，根据元素的位置、大小和其他属性信息，设置元素的属性。
 * @param e
 * @return {string}
 */

export function elementToString(e) {
  if (!e) {
    return '<null>'
  }
  return '<' + e.$type + (e.id ? ' id="' + e.id : '') + '" />'
}

function elementData(semantic, di, attrs) {
  return assign(
    {
      id: semantic.id,
      type: semantic.$type,
      businessObject: semantic,
      di: di
    },
    attrs
  )
}

function getWaypoints(di, source, target) {
  var waypoints = di.waypoint
  if (!waypoints || waypoints.length < 2) {
    return [getMid(source), getMid(target)]
  }
  return waypoints.map(function (p) {
    return { x: p.x, y: p.y }
  })
}

function notYetDrawn(translate, semantic, refSemantic, property) {
  return new Error(
    translate('element {element} referenced by {referenced}#{property} not yet drawn', {
      element: elementToString(refSemantic),
      referenced: elementToString(semantic),
      property: property
    })
  )
}

export default function BpmnImporter(eventBus, canvas, elementFactory, elementRegistry, translate, textRenderer) {
  this._eventBus = eventBus
  this._canvas = canvas
  this._elementFactory = elementFactory
  this._elementRegistry = elementRegistry
  this._translate = translate
  this._textRenderer = textRenderer
}
BpmnImporter.$inject = ['eventBus', 'canvas', 'elementFactory', 'elementRegistry', 'translate', 'textRenderer']
BpmnImporter.prototype.add = function (semantic, di, parentElement) {
  var element,
    translate = this._translate,
    hidden
  var parentIndex
  if (is(di, 'bpmndi:BPMNPlane')) {
    var attrs = is(semantic, 'bpmn:SubProcess') ? { id: semantic.id + '_plane' } : {}
    element = this._elementFactory.createRoot(elementData(semantic, di, attrs))
    this._canvas.addRootElement(element)
  } else if (is(di, 'bpmndi:BPMNShape')) {
    var collapsed = !isExpanded(semantic, di),
      isFrame = isFrameElement(semantic)
    hidden = parentElement && (parentElement.hidden || parentElement.collapsed)
    var bounds = di.bounds
    element = this._elementFactory.createShape(
      elementData(semantic, di, {
        collapsed: collapsed,
        hidden: hidden,
        x: Math.round(bounds.x),
        y: Math.round(bounds.y),
        width: Math.round(bounds.width),
        height: Math.round(bounds.height),
        isFrame: isFrame
      })
    )
    if (is(semantic, 'bpmn:BoundaryEvent')) {
      this._attachBoundary(semantic, element)
    }
    if (is(semantic, 'bpmn:Lane')) {
      parentIndex = 0
    }
    if (is(semantic, 'bpmn:DataStoreReference')) {
      if (!isPointInsideBBox(parentElement, getMid(bounds))) {
        parentElement = this._canvas.findRoot(parentElement)
      }
    }
    this._canvas.addShape(element, parentElement, parentIndex)
  } else if (is(di, 'bpmndi:BPMNEdge')) {
    var source = this._getSource(semantic),
      target = this._getTarget(semantic)
    hidden = parentElement && (parentElement.hidden || parentElement.collapsed)
    element = this._elementFactory.createConnection(
      elementData(semantic, di, {
        hidden: hidden,
        source: source,
        target: target,
        waypoints: getWaypoints(di, source, target)
      })
    )
    if (is(semantic, 'bpmn:DataAssociation')) {
      parentElement = this._canvas.findRoot(parentElement)
    }
    this._canvas.addConnection(element, parentElement, parentIndex)
  } else {
    throw new Error(
      translate('unknown di {di} for element {semantic}', {
        di: elementToString(di),
        semantic: elementToString(semantic)
      })
    )
  }
  if (isLabelExternal(semantic) && getLabel(element)) {
    this.addLabel(semantic, di, element)
  }
  this._eventBus.fire('bpmnElement.added', { element: element })
  return element
}
BpmnImporter.prototype._attachBoundary = function (boundarySemantic, boundaryElement) {
  var translate = this._translate
  var hostSemantic = boundarySemantic.attachedToRef
  if (!hostSemantic) {
    throw new Error(
      translate('missing {semantic}#attachedToRef', {
        semantic: elementToString(boundarySemantic)
      })
    )
  }
  var host = this._elementRegistry.get(hostSemantic.id),
    attachers = host && host.attachers
  if (!host) {
    throw notYetDrawn(translate, boundarySemantic, hostSemantic, 'attachedToRef')
  }
  boundaryElement.host = host
  if (!attachers) {
    host.attachers = attachers = []
  }
  if (attachers.indexOf(boundaryElement) === -1) {
    attachers.push(boundaryElement)
  }
}
BpmnImporter.prototype.addLabel = function (semantic, di, element) {
  var bounds, text, label
  bounds = getExternalLabelBounds(di, element)
  text = getLabel(element)
  if (text) {
    bounds = this._textRenderer.getExternalLabelBounds(bounds, text)
  }
  label = this._elementFactory.createLabel(
    elementData(semantic, di, {
      id: semantic.id + '_label',
      labelTarget: element,
      type: 'label',
      hidden: element.hidden || !getLabel(element),
      x: Math.round(bounds.x),
      y: Math.round(bounds.y),
      width: Math.round(bounds.width),
      height: Math.round(bounds.height)
    })
  )
  return this._canvas.addShape(label, element.parent)
}
BpmnImporter.prototype._getConnectedElement = function (semantic, side) {
  var element,
    refSemantic,
    type = semantic.$type,
    translate = this._translate
  refSemantic = semantic[side + 'Ref']
  if (side === 'source' && type === 'bpmn:DataInputAssociation') {
    refSemantic = refSemantic && refSemantic[0]
  }
  if ((side === 'source' && type === 'bpmn:DataOutputAssociation') || (side === 'target' && type === 'bpmn:DataInputAssociation')) {
    refSemantic = semantic.$parent
  }
  element = refSemantic && this._getElement(refSemantic)
  if (element) {
    return element
  }
  if (refSemantic) {
    throw notYetDrawn(translate, semantic, refSemantic, side + 'Ref')
  } else {
    throw new Error(
      translate('{semantic}#{side} Ref not specified', {
        semantic: elementToString(semantic),
        side: side
      })
    )
  }
}
BpmnImporter.prototype._getSource = function (semantic) {
  return this._getConnectedElement(semantic, 'source')
}
BpmnImporter.prototype._getTarget = function (semantic) {
  return this._getConnectedElement(semantic, 'target')
}
BpmnImporter.prototype._getElement = function (semantic) {
  return this._elementRegistry.get(semantic.id)
}
function isPointInsideBBox(bbox, point) {
  var x = point.x,
    y = point.y
  return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height
}
function isFrameElement(semantic) {
  return is(semantic, 'bpmn:Group')
}
