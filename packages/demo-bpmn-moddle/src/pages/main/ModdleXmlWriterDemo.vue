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

  const complexCount = model.create('props:ComplexCount', { id: 'ComplexCount_1' })
  const complexNesting = model.create('props:ComplexNesting', { id: 'ComplexNesting_1' })

  const referencingCollection = model.create('props:ReferencingCollection', {
    references: [complexCount, complexNesting]
  })
  complexCount.$parent = complexNesting.$parent = referencingCollection

  const simpleBody1 = model.create('props:SimpleBody', { body: 'foo', otherAttr: 'other foo' })
  const simpleBody2 = model.create('props:SimpleBody', { body: 'bar', anotherAttr: 'another bar' })
  const simpleBody3 = model.create('props:SimpleBody', { body: 'baz', anotherAttr: 'another baz' })

  const colAttr1 = model.create('props:Attributes', { name: 'integerValue', value: 10, arr: [1, 2, 3] })
  const colAttr2 = model.create('props:Attributes', { name: 'booleanValue', value: true, obj: { a: 1, b: 2, c: 3 } })
  const complexAttrsCol = model.create('props:ComplexAttrsCol', {
    attrs: [colAttr1, colAttr2]
  })
  colAttr1.$parent = colAttr2.$parent = complexAttrsCol

  const colAttr3 = model.create('props:Attributes', { name: 'integerValue', value: 10 })
  const complexAttrs = model.create('props:ComplexAttrs', {
    attrs: colAttr3
  })
  colAttr3.$parent = complexAttrs

  const propertyValue = model.create('props:BaseWithId', { id: 'PropertyValue' })
  const typeValue = model.create('props:BaseWithId', { id: 'PropertyValue' })
  const defineValue = model.create('props:BaseWithId', { id: 'PropertyValue' })
  const withProperty = model.create('props:WithProperty', { propertyName: propertyValue, typeName: typeValue, defineName: defineValue })

  const root = model.create('props:Root', {
    any: [simpleBody1, simpleBody2, simpleBody3, containedCollection, attributeReferenceCollection, referencingCollection, complexAttrs, complexAttrsCol, withProperty],
    otherAttr: 'other root',
    anotherAttr: 'another root'
  })
  simpleBody1.$parent = simpleBody2.$parent = simpleBody3.$parent = withProperty.$parent = root
  containedCollection.$parent = attributeReferenceCollection.$parent = referencingCollection.$parent = complexAttrsCol.$parent = root

  console.log(root)

  const xml1 = writer.toXML(root)
  console.log(xml1)
</script>

<template>
  <div>
    <p>打开控制台查看输出</p>
  </div>
</template>
