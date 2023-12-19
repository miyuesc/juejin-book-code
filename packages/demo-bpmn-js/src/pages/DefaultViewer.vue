<script setup>
  import { onMounted } from 'vue'
  import Viewer from 'bpmn-js/lib/Viewer'

  let baseViewer = null

  const initialDiagram = `<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_Process_1702970060437" targetNamespace="http://bpmn.io/schema/bpmn">
<bpmn:collaboration id="Collaboration_0mef25h">
<bpmn:participant id="Participant_1k7vns4" processRef="Process_1702970060437"/>
<bpmn:participant id="Participant_0esb9yn" processRef="Process_1kzk8z5"/>
<bpmn:messageFlow id="Flow_1hl940e" sourceRef="Participant_1k7vns4" targetRef="Participant_0esb9yn"/>
</bpmn:collaboration>
<bpmn:process id="Process_1702970060437" name="业务流程_1702970060437" isExecutable="true">
<bpmn:laneSet id="LaneSet_1sjs8ng">
<bpmn:lane id="Lane_15cztm5">
<bpmn:flowNodeRef>Event_1s9o54x</bpmn:flowNodeRef>
</bpmn:lane>
<bpmn:lane id="Lane_0l5g46x">
<bpmn:flowNodeRef>Activity_14cfkwy</bpmn:flowNodeRef>
</bpmn:lane>
<bpmn:lane id="Lane_19xhfpy">
<bpmn:flowNodeRef>Event_122wpuy</bpmn:flowNodeRef>
</bpmn:lane>
</bpmn:laneSet>
<bpmn:subProcess id="Activity_14cfkwy">
<bpmn:incoming>Flow_06o3r3g</bpmn:incoming>
<bpmn:outgoing>Flow_17i8e2p</bpmn:outgoing>
<bpmn:startEvent id="Event_00dnpre">
<bpmn:outgoing>Flow_0nulyhq</bpmn:outgoing>
</bpmn:startEvent>
<bpmn:userTask id="Activity_0xh13d8">
<bpmn:incoming>Flow_0nulyhq</bpmn:incoming>
</bpmn:userTask>
<bpmn:sequenceFlow id="Flow_0nulyhq" sourceRef="Event_00dnpre" targetRef="Activity_0xh13d8"/>
</bpmn:subProcess>
<bpmn:startEvent id="Event_1s9o54x">
<bpmn:outgoing>Flow_06o3r3g</bpmn:outgoing>
</bpmn:startEvent>
<bpmn:sequenceFlow id="Flow_06o3r3g" sourceRef="Event_1s9o54x" targetRef="Activity_14cfkwy"/>
<bpmn:endEvent id="Event_122wpuy">
<bpmn:incoming>Flow_17i8e2p</bpmn:incoming>
</bpmn:endEvent>
<bpmn:sequenceFlow id="Flow_17i8e2p" sourceRef="Activity_14cfkwy" targetRef="Event_122wpuy"/>
</bpmn:process>
<bpmn:process id="Process_1kzk8z5">
<bpmn:laneSet id="LaneSet_0iyhxlq">
<bpmn:lane id="Lane_0un9uxm">
<bpmn:flowNodeRef>Event_1ykj0ru</bpmn:flowNodeRef>
</bpmn:lane>
<bpmn:lane id="Lane_1j5fyta"/>
<bpmn:lane id="Lane_09tpwc0">
<bpmn:flowNodeRef>Event_035o24t</bpmn:flowNodeRef>
</bpmn:lane>
</bpmn:laneSet>
<bpmn:startEvent id="Event_1ykj0ru">
<bpmn:outgoing>Flow_1m182zy</bpmn:outgoing>
</bpmn:startEvent>
<bpmn:sequenceFlow id="Flow_1m182zy" sourceRef="Event_1ykj0ru" targetRef="Event_035o24t"/>
<bpmn:endEvent id="Event_035o24t">
<bpmn:incoming>Flow_1m182zy</bpmn:incoming>
</bpmn:endEvent>
</bpmn:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0mef25h">
<bpmndi:BPMNShape id="Participant_1k7vns4_di" bpmnElement="Participant_1k7vns4" isHorizontal="true">
<dc:Bounds x="220" y="140" width="760" height="470"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Lane_19xhfpy_di" bpmnElement="Lane_19xhfpy" isHorizontal="true">
<dc:Bounds x="740" y="170" width="240" height="440"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Lane_0l5g46x_di" bpmnElement="Lane_0l5g46x" isHorizontal="true">
<dc:Bounds x="530" y="170" width="210" height="440"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Lane_15cztm5_di" bpmnElement="Lane_15cztm5" isHorizontal="true">
<dc:Bounds x="220" y="170" width="310" height="440"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_14cfkwy_di" bpmnElement="Activity_14cfkwy" isExpanded="true">
<dc:Bounds x="370" y="210" width="350" height="200"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Event_00dnpre_di" bpmnElement="Event_00dnpre">
<dc:Bounds x="410" y="292" width="40" height="40"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Activity_0xh13d8_di" bpmnElement="Activity_0xh13d8">
<dc:Bounds x="520" y="252" width="120" height="120"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_0nulyhq_di" bpmnElement="Flow_0nulyhq">
<di:waypoint x="450" y="312"/>
<di:waypoint x="520" y="312"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Event_1s9o54x_di" bpmnElement="Event_1s9o54x">
<dc:Bounds x="250" y="290" width="40" height="40"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Event_122wpuy_di" bpmnElement="Event_122wpuy">
<dc:Bounds x="790" y="290" width="40" height="40"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_06o3r3g_di" bpmnElement="Flow_06o3r3g">
<di:waypoint x="290" y="310"/>
<di:waypoint x="370" y="310"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_17i8e2p_di" bpmnElement="Flow_17i8e2p">
<di:waypoint x="720" y="310"/>
<di:waypoint x="790" y="310"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNShape id="Participant_0esb9yn_di" bpmnElement="Participant_0esb9yn" isHorizontal="true">
<dc:Bounds x="220" y="670" width="770" height="320"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Lane_0un9uxm_di" bpmnElement="Lane_0un9uxm" isHorizontal="true">
<dc:Bounds x="220" y="700" width="170" height="290"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Lane_1j5fyta_di" bpmnElement="Lane_1j5fyta" isHorizontal="true">
<dc:Bounds x="390" y="700" width="160" height="290"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Lane_09tpwc0_di" bpmnElement="Lane_09tpwc0" isHorizontal="true">
<dc:Bounds x="550" y="700" width="440" height="290"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Event_1ykj0ru_di" bpmnElement="Event_1ykj0ru">
<dc:Bounds x="290" y="790" width="40" height="40"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNShape id="Event_035o24t_di" bpmnElement="Event_035o24t">
<dc:Bounds x="720" y="790" width="40" height="40"/>
</bpmndi:BPMNShape>
<bpmndi:BPMNEdge id="Flow_1m182zy_di" bpmnElement="Flow_1m182zy">
<di:waypoint x="330" y="810"/>
<di:waypoint x="720" y="810"/>
</bpmndi:BPMNEdge>
<bpmndi:BPMNEdge id="Flow_1hl940e_di" bpmnElement="Flow_1hl940e">
<di:waypoint x="600" y="610"/>
<di:waypoint x="600" y="670"/>
</bpmndi:BPMNEdge>
</bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn:definitions>`

  onMounted(async () => {
    baseViewer = new Viewer({
      container: '#viewer-content'
    })

    console.log(baseViewer)
    baseViewer.on('import.parse.complete', (event) => {
      console.log('---------------import.parse.complete---------------')
      console.log(event)
    })

    baseViewer
      .importXML(initialDiagram)
      .then((res) => {
        console.log('---------------importXML---------------')
        console.log(res)
        console.log(baseViewer.get('elementRegistry').get('StartEvent_1'))
      })
      .catch((error) => {
        console.error('---------------importXML error---------------')
        const { message, warnings } = error
        console.info(message, warnings)
      })
    //
    // baseViewer
    //   .importXML(initialDiagram, 'BPMNDiagram_1')
    //   .then((res) => {
    //     console.log('---------------importXML with bpmnDiagram---------------')
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.error('---------------importXML with bpmnDiagram error---------------')
    //     const { message, warnings } = error
    //     console.info(message, warnings)
    //   })
    //
    // baseViewer
    //   .importDefinitions({ $type: 'bpmn:Definitions' }, 'BPMNDiagram_1')
    //   .then((res) => {
    //     console.log('---------------importDefinitions with bpmnDiagram---------------')
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.error('---------------importDefinitions with bpmnDiagram error---------------')
    //     const { message, warnings } = error
    //     console.info(message, warnings)
    //   })
    //
    // baseViewer
    //   .importDefinitions({ $type: 'bpmn:Definitions' })
    //   .then((res) => {
    //     console.log('---------------importDefinitions---------------')
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.error('---------------importDefinitions error---------------')
    //     const { message, warnings } = error
    //     console.info(message, warnings)
    //   })
    //
    // baseViewer
    //   .open('BPMNDiagram_1')
    //   .then((res) => {
    //     console.log('---------------open with bpmnDiagramId---------------')
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.error('---------------open with bpmnDiagramId error---------------')
    //     const { message, warnings } = error
    //     console.info(message, warnings)
    //   })
    //
    // baseViewer
    //   .open({ $type: 'bpmn:BPMNDiagram' })
    //   .then((res) => {
    //     console.log('---------------open with bpmnDiagramModdleElement---------------')
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.error('---------------open with bpmnDiagramModdleElement error---------------')
    //     const { message, warnings } = error
    //     console.info(message, warnings)
    //   })
  })
</script>

<template>
  <div id="viewer-content" class="canvas viewer-content"></div>
</template>
