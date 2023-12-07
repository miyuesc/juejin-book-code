<script setup>
  import { Moddle } from 'moddle'
  import { Writer } from '@bpmn-analysis/source-codes'

  import properties from '../../model/properties.json'
  import propertiesExtended from '../../model/properties-extended.json'

  const model = new Moddle([properties, propertiesExtended])
  const writer = new Writer({ format: true })

  // 1. 特殊 serialize 序列化
  const complex1 = model.create('props:Complex', { id: 'C_1', body: 'this is complex c_1' })
  const complex2 = model.create('props:Complex', { id: 'C_2', body: 'this is complex c_2' })
  const complex3 = model.create('props:Complex', { id: 'C_3', body: 'this is complex c_3' })

  const containedCollection = model.create('props:ContainedCollection', {
    id: 'C_5',
    children: [complex1, complex2, complex3]
  })
  complex1.$parent = complex2.$parent = complex3.$parent = containedCollection

  const attributeReferenceCollection = model.create('props:AttributeReferenceCollection', {
    id: 'C_4',
    refs: [complex1, complex2, complex3]
  })

  const simpleBody1 = model.create('props:SimpleBody', { body: 'foo' })
  const simpleBody2 = model.create('props:SimpleBody', { body: 'bar' })
  const simpleBody3 = model.create('props:SimpleBody', { body: 'baz' })

  const colAttr1 = model.create('props:Attributes', { name: 'integerValue', value: 10 })
  const colAttr2 = model.create('props:Attributes', { name: 'booleanValue', value: true })
  const complexAttrsCol = model.create('props:ComplexAttrsCol', {
    attrs: [colAttr1, colAttr2]
  })
  colAttr1.$parent = colAttr2.$parent = complexAttrsCol

  const root = model.create('props:Root', {
    any: [simpleBody1, simpleBody2, simpleBody3, containedCollection, attributeReferenceCollection, complexAttrsCol]
  })
  simpleBody1.$parent = simpleBody2.$parent = simpleBody3.$parent = root
  containedCollection.$parent = attributeReferenceCollection.$parent = complexAttrsCol.$parent = root

  console.log(root)

  const xml1 = writer.toXML(root)
  console.log(xml1)
</script>

<template>
  <div>
    <p>打开控制台查看输出</p>
  </div>
</template>
