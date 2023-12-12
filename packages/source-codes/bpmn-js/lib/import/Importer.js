import { find, forEach, map } from 'min-dash'
import BpmnTreeWalker from './BpmnTreeWalker'
import { is } from '../util/ModelUtil'

export function importBpmnDiagram(diagram, definitions, bpmnDiagram) {
  var importer, eventBus, translate, canvas
  var error,
    warnings = []
  function render(definitions, bpmnDiagram) {
    var visitor = {
      root: function (element, di) {
        return importer.add(element, di)
      },
      element: function (element, di, parentShape) {
        return importer.add(element, di, parentShape)
      },
      error: function (message, context) {
        warnings.push({ message: message, context: context })
      }
    }
    var walker = new BpmnTreeWalker(visitor, translate)
    bpmnDiagram = bpmnDiagram || (definitions.diagrams && definitions.diagrams[0])
    var diagramsToImport = getDiagramsToImport(definitions, bpmnDiagram)
    if (!diagramsToImport) {
      throw new Error(translate('no diagram to display'))
    }
    forEach(diagramsToImport, function (diagram) {
      walker.handleDefinitions(definitions, diagram)
    })
    var rootId = bpmnDiagram.plane.bpmnElement.id
    canvas.setRootElement(canvas.findRoot(rootId + '_plane') || canvas.findRoot(rootId))
  }
  return new Promise(function (resolve, reject) {
    try {
      importer = diagram.get('bpmnImporter')
      eventBus = diagram.get('eventBus')
      translate = diagram.get('translate')
      canvas = diagram.get('canvas')
      eventBus.fire('import.render.start', { definitions: definitions })
      render(definitions, bpmnDiagram)
      eventBus.fire('import.render.complete', {
        error: error,
        warnings: warnings
      })
      return resolve({ warnings: warnings })
    } catch (e) {
      e.warnings = warnings
      return reject(e)
    }
  })
}
function getDiagramsToImport(definitions, bpmnDiagram) {
  if (!bpmnDiagram) {
    return
  }
  var bpmnElement = bpmnDiagram.plane.bpmnElement,
    rootElement = bpmnElement
  if (!is(bpmnElement, 'bpmn:Process') && !is(bpmnElement, 'bpmn:Collaboration')) {
    rootElement = findRootProcess(bpmnElement)
  }
  var collaboration
  if (is(rootElement, 'bpmn:Collaboration')) {
    collaboration = rootElement
  } else {
    collaboration = find(definitions.rootElements, function (element) {
      if (!is(element, 'bpmn:Collaboration')) {
        return
      }
      return find(element.participants, function (participant) {
        return participant.processRef === rootElement
      })
    })
  }
  var rootElements = [rootElement]
  if (collaboration) {
    rootElements = map(collaboration.participants, function (participant) {
      return participant.processRef
    })
    rootElements.push(collaboration)
  }
  var allChildren = selfAndAllFlowElements(rootElements)
  var diagramsToImport = [bpmnDiagram]
  var handledElements = [bpmnElement]
  forEach(definitions.diagrams, function (diagram) {
    var businessObject = diagram.plane.bpmnElement
    if (allChildren.indexOf(businessObject) !== -1 && handledElements.indexOf(businessObject) === -1) {
      diagramsToImport.push(diagram)
      handledElements.push(businessObject)
    }
  })
  return diagramsToImport
}
function selfAndAllFlowElements(elements) {
  var result = []
  forEach(elements, function (element) {
    if (!element) {
      return
    }
    result.push(element)
    result = result.concat(selfAndAllFlowElements(element.flowElements))
  })
  return result
}
function findRootProcess(element) {
  var parent = element
  while (parent) {
    if (is(parent, 'bpmn:Process')) {
      return parent
    }
    parent = parent.$parent
  }
}
