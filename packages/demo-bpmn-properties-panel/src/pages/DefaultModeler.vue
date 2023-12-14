<script setup>
  import { onMounted } from 'vue'
  import Modeler from 'bpmn-js/lib/Modeler'
  import {
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    CamundaPlatformPropertiesProviderModule
    // ZeebePropertiesProviderModule,
    // ZeebeTooltipProvider
  } from 'bpmn-js-properties-panel'
  // import CamundaExtensionModule from 'camunda-bpmn-moddle/lib'
  import camundaModdleDescriptors from 'camunda-bpmn-moddle/resources/camunda'

  import Translate from '../utils/Translate'

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

  onMounted(async () => {
    modeler = new Modeler({
      container: '#modeler-content',
      propertiesPanel: {
        parent: '#panel-content'
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule,
        // ZeebePropertiesProviderModule,
        // ZeebeTooltipProvider,
        // CamundaExtensionModule
        Translate
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptors
      }
    })

    modeler.importXML(initialDiagram)
  })
</script>

<template>
  <div class="modeler-container">
    <div id="modeler-content" class="canvas modeler-content"></div>
    <div id="panel-content" class="panel-content"></div>
  </div>
</template>

<style>
  .modeler-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 400px;
  }
</style>
