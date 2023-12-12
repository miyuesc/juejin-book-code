<script setup>
  import { onMounted } from 'vue'
  import Modeler from 'bpmn-js/lib/Modeler'

  let modeler = null

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

  const str = `<bpmn:subProcess id="Activity_1l4lzuz">
      <bpmn:startEvent id="Event_02gktss">
        <bpmn:outgoing>Flow_0krx5ob</bpmn:outgoing>
      </bpmn:startEvent>
      <bpmn:task id="Activity_030tlp4">
        <bpmn:incoming>Flow_0krx5ob</bpmn:incoming>
        <bpmn:outgoing>Flow_0miiqpt</bpmn:outgoing>
      </bpmn:task>
      <bpmn:sequenceFlow id="Flow_0krx5ob" sourceRef="Event_02gktss" targetRef="Activity_030tlp4" />
      <bpmn:task id="Activity_0jrr2wa">
        <bpmn:incoming>Flow_0miiqpt</bpmn:incoming>
      </bpmn:task>
      <bpmn:sequenceFlow id="Flow_0miiqpt" sourceRef="Activity_030tlp4" targetRef="Activity_0jrr2wa" />
    </bpmn:subProcess>`

  onMounted(async () => {
    modeler = new Modeler({
      container: '#modeler-content'
    })

    await modeler.createDiagram()
    const model = modeler.get('moddle')

    console.log(await model.fromXML(initialDiagram, 'bpmn:Definitions'))
    console.log(await model.fromXML(str, 'bpmn:SubProcess'))
    console.log(modeler.get('elementFactory').createShape({ type: 'bpmn:UserTask' }))
  })
</script>

<template>
  <div id="modeler-content" class="canvas modeler-content"></div>
</template>
