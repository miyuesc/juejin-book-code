<script setup>
  import { onMounted } from 'vue'
  import Viewer from 'bpmn-js/lib/Viewer'

  let baseViewer = null

  const initialDiagram =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
    'targetNamespace="http://bpmn.io/schema/bpmn" ' +
    'id="Definitions_1">' +
    '<bpmn:process id="Process_1" isExecutable="false">' +
    '<bpmn:startEvent id="StartEvent_1"/>' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
    '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
    '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' +
    '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>' +
    '</bpmndi:BPMNShape>' +
    '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
    '</bpmn:definitions>'

  onMounted(async () => {
    baseViewer = new Viewer({
      container: '#viewer-content'
    })

    console.log(baseViewer)

    baseViewer
      .importXML(initialDiagram)
      .then((res) => {
        console.log('---------------importXML---------------')
        console.log(res)
      })
      .catch((error) => {
        console.error('---------------importXML error---------------')
        const { message, warnings } = error
        console.info(message, warnings)
      })

    baseViewer
      .importXML(initialDiagram, 'BPMNDiagram_1')
      .then((res) => {
        console.log('---------------importXML with bpmnDiagram---------------')
        console.log(res)
      })
      .catch((error) => {
        console.error('---------------importXML with bpmnDiagram error---------------')
        const { message, warnings } = error
        console.info(message, warnings)
      })

    baseViewer
      .importDefinitions({ $type: 'bpmn:Definitions' }, 'BPMNDiagram_1')
      .then((res) => {
        console.log('---------------importDefinitions with bpmnDiagram---------------')
        console.log(res)
      })
      .catch((error) => {
        console.error('---------------importDefinitions with bpmnDiagram error---------------')
        const { message, warnings } = error
        console.info(message, warnings)
      })

    baseViewer
      .importDefinitions({ $type: 'bpmn:Definitions' })
      .then((res) => {
        console.log('---------------importDefinitions---------------')
        console.log(res)
      })
      .catch((error) => {
        console.error('---------------importDefinitions error---------------')
        const { message, warnings } = error
        console.info(message, warnings)
      })

    baseViewer
      .open('BPMNDiagram_1')
      .then((res) => {
        console.log('---------------open with bpmnDiagramId---------------')
        console.log(res)
      })
      .catch((error) => {
        console.error('---------------open with bpmnDiagramId error---------------')
        const { message, warnings } = error
        console.info(message, warnings)
      })

    baseViewer
      .open({ $type: 'bpmn:BPMNDiagram' })
      .then((res) => {
        console.log('---------------open with bpmnDiagramModdleElement---------------')
        console.log(res)
      })
      .catch((error) => {
        console.error('---------------open with bpmnDiagramModdleElement error---------------')
        const { message, warnings } = error
        console.info(message, warnings)
      })
  })
</script>

<template>
  <div id="viewer-content" class="canvas viewer-content"></div>
</template>
