import { filter, find, forEach } from 'min-dash'
import { elementToString } from './BpmnImporter.js'
import { ensureCompatDiRef } from '../util/CompatibilityUtil'

function is(element, type) {
  return element.$instanceOf(type)
}

function findDisplayCandidate(definitions) {
  return find(definitions.rootElements, function (e) {
    return is(e, 'bpmn:Process') || is(e, 'bpmn:Collaboration')
  })
}

export default function BpmnTreeWalker(handler, translate) {
  var handledElements = {}
  var deferred = []
  var diMap = {}
  function contextual(fn, ctx) {
    return function (e) {
      fn(e, ctx)
    }
  }
  function handled(element) {
    handledElements[element.id] = element
  }
  function isHandled(element) {
    return handledElements[element.id]
  }
  function visit(element, ctx) {
    var gfx = element.gfx
    if (gfx) {
      throw new Error(translate('already rendered {element}', { element: elementToString(element) }))
    }
    return handler.element(element, diMap[element.id], ctx)
  }
  function visitRoot(element, diagram) {
    return handler.root(element, diMap[element.id], diagram)
  }
  function visitIfDi(element, ctx) {
    try {
      var gfx = diMap[element.id] && visit(element, ctx)
      handled(element)
      return gfx
    } catch (e) {
      logError(e.message, { element: element, error: e })
      console.error(translate('failed to import {element}', { element: elementToString(element) }))
      console.error(e)
    }
  }
  function logError(message, context) {
    handler.error(message, context)
  }
  var registerDi = (this.registerDi = function registerDi(di) {
    var bpmnElement = di.bpmnElement
    if (bpmnElement) {
      if (diMap[bpmnElement.id]) {
        logError(
          translate('multiple DI elements defined for {element}', {
            element: elementToString(bpmnElement)
          }),
          { element: bpmnElement }
        )
      } else {
        diMap[bpmnElement.id] = di
        ensureCompatDiRef(bpmnElement)
      }
    } else {
      logError(
        translate('no bpmnElement referenced in {element}', {
          element: elementToString(di)
        }),
        { element: di }
      )
    }
  })
  function handleDiagram(diagram) {
    handlePlane(diagram.plane)
  }
  function handlePlane(plane) {
    registerDi(plane)
    forEach(plane.planeElement, handlePlaneElement)
  }
  function handlePlaneElement(planeElement) {
    registerDi(planeElement)
  }
  this.handleDefinitions = function handleDefinitions(definitions, diagram) {
    var diagrams = definitions.diagrams
    if (diagram && diagrams.indexOf(diagram) === -1) {
      throw new Error(translate('diagram not part of bpmn:Definitions'))
    }
    if (!diagram && diagrams && diagrams.length) {
      diagram = diagrams[0]
    }
    if (!diagram) {
      throw new Error(translate('no diagram to display'))
    }
    diMap = {}
    handleDiagram(diagram)
    var plane = diagram.plane
    if (!plane) {
      throw new Error(translate('no plane for {element}', { element: elementToString(diagram) }))
    }
    var rootElement = plane.bpmnElement
    if (!rootElement) {
      rootElement = findDisplayCandidate(definitions)
      if (!rootElement) {
        throw new Error(translate('no process or collaboration to display'))
      } else {
        logError(
          translate('correcting missing bpmnElement on {plane} to {rootElement}', {
            plane: elementToString(plane),
            rootElement: elementToString(rootElement)
          })
        )
        plane.bpmnElement = rootElement
        registerDi(plane)
      }
    }
    var ctx = visitRoot(rootElement, plane)
    if (is(rootElement, 'bpmn:Process') || is(rootElement, 'bpmn:SubProcess')) {
      handleProcess(rootElement, ctx)
    } else if (is(rootElement, 'bpmn:Collaboration')) {
      handleCollaboration(rootElement, ctx)
      handleUnhandledProcesses(definitions.rootElements, ctx)
    } else {
      throw new Error(
        translate('unsupported bpmnElement for {plane}: {rootElement}', {
          plane: elementToString(plane),
          rootElement: elementToString(rootElement)
        })
      )
    }
    handleDeferred(deferred)
  }
  var handleDeferred = (this.handleDeferred = function handleDeferred() {
    var fn
    while (deferred.length) {
      fn = deferred.shift()
      fn()
    }
  })
  function handleProcess(process, context) {
    handleFlowElementsContainer(process, context)
    handleIoSpecification(process.ioSpecification, context)
    handleArtifacts(process.artifacts, context)
    handled(process)
  }
  function handleUnhandledProcesses(rootElements, ctx) {
    var processes = filter(rootElements, function (e) {
      return !isHandled(e) && is(e, 'bpmn:Process') && e.laneSets
    })
    processes.forEach(contextual(handleProcess, ctx))
  }
  function handleMessageFlow(messageFlow, context) {
    visitIfDi(messageFlow, context)
  }
  function handleMessageFlows(messageFlows, context) {
    forEach(messageFlows, contextual(handleMessageFlow, context))
  }
  function handleDataAssociation(association, context) {
    visitIfDi(association, context)
  }
  function handleDataInput(dataInput, context) {
    visitIfDi(dataInput, context)
  }
  function handleDataOutput(dataOutput, context) {
    visitIfDi(dataOutput, context)
  }
  function handleArtifact(artifact, context) {
    visitIfDi(artifact, context)
  }
  function handleArtifacts(artifacts, context) {
    forEach(artifacts, function (e) {
      if (is(e, 'bpmn:Association')) {
        deferred.push(function () {
          handleArtifact(e, context)
        })
      } else {
        handleArtifact(e, context)
      }
    })
  }
  function handleIoSpecification(ioSpecification, context) {
    if (!ioSpecification) {
      return
    }
    forEach(ioSpecification.dataInputs, contextual(handleDataInput, context))
    forEach(ioSpecification.dataOutputs, contextual(handleDataOutput, context))
  }
  var handleSubProcess = (this.handleSubProcess = function handleSubProcess(subProcess, context) {
    handleFlowElementsContainer(subProcess, context)
    handleArtifacts(subProcess.artifacts, context)
  })
  function handleFlowNode(flowNode, context) {
    var childCtx = visitIfDi(flowNode, context)
    if (is(flowNode, 'bpmn:SubProcess')) {
      handleSubProcess(flowNode, childCtx || context)
    }
    if (is(flowNode, 'bpmn:Activity')) {
      handleIoSpecification(flowNode.ioSpecification, context)
    }
    deferred.push(function () {
      forEach(flowNode.dataInputAssociations, contextual(handleDataAssociation, context))
      forEach(flowNode.dataOutputAssociations, contextual(handleDataAssociation, context))
    })
  }
  function handleSequenceFlow(sequenceFlow, context) {
    visitIfDi(sequenceFlow, context)
  }
  function handleDataElement(dataObject, context) {
    visitIfDi(dataObject, context)
  }
  function handleLane(lane, context) {
    deferred.push(function () {
      var newContext = visitIfDi(lane, context)
      if (lane.childLaneSet) {
        handleLaneSet(lane.childLaneSet, newContext || context)
      }
      wireFlowNodeRefs(lane)
    })
  }
  function handleLaneSet(laneSet, context) {
    forEach(laneSet.lanes, contextual(handleLane, context))
  }
  function handleLaneSets(laneSets, context) {
    forEach(laneSets, contextual(handleLaneSet, context))
  }
  function handleFlowElementsContainer(container, context) {
    handleFlowElements(container.flowElements, context)
    if (container.laneSets) {
      handleLaneSets(container.laneSets, context)
    }
  }
  function handleFlowElements(flowElements, context) {
    forEach(flowElements, function (e) {
      if (is(e, 'bpmn:SequenceFlow')) {
        deferred.push(function () {
          handleSequenceFlow(e, context)
        })
      } else if (is(e, 'bpmn:BoundaryEvent')) {
        deferred.unshift(function () {
          handleFlowNode(e, context)
        })
      } else if (is(e, 'bpmn:FlowNode')) {
        handleFlowNode(e, context)
      } else if (is(e, 'bpmn:DataObject')) {
        //
      } else if (is(e, 'bpmn:DataStoreReference')) {
        handleDataElement(e, context)
      } else if (is(e, 'bpmn:DataObjectReference')) {
        handleDataElement(e, context)
      } else {
        logError(
          translate('unrecognized flowElement {element} in context {context}', {
            element: elementToString(e),
            context: context ? elementToString(context.businessObject) : 'null'
          }),
          { element: e, context: context }
        )
      }
    })
  }
  function handleParticipant(participant, context) {
    var newCtx = visitIfDi(participant, context)
    var process = participant.processRef
    if (process) {
      handleProcess(process, newCtx || context)
    }
  }
  function handleCollaboration(collaboration, context) {
    forEach(collaboration.participants, contextual(handleParticipant, context))
    handleArtifacts(collaboration.artifacts, context)
    deferred.push(function () {
      handleMessageFlows(collaboration.messageFlows, context)
    })
  }
  function wireFlowNodeRefs(lane) {
    forEach(lane.flowNodeRef, function (flowNode) {
      var lanes = flowNode.get('lanes')
      if (lanes) {
        lanes.push(lane)
      }
    })
  }
}
