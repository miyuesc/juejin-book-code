<script setup>
  import { Moddle } from 'moddle'
  import Properties from '../../model/properties.json'

  const model = new Moddle([Properties])

  console.log(model)

  const ComplexType = model.getType('props:Complex')
  const SimpleBody = model.getType('props:SimpleBody')
  const Attributes = model.getType('props:Attributes')
  console.log(ComplexType, SimpleBody, Attributes)

  const complexTypeInst = model.create('props:Complex', { name: 'complex', id: 'complex', idx: 1 })
  const simpleBodyInst = model.create('props:SimpleBody', { body: 'simple', idx: 2 })
  const attributesInst = model.create('props:Attributes', { attrs: [complexTypeInst, simpleBodyInst], idx: 3 })
  console.log(complexTypeInst, simpleBodyInst, attributesInst)

  const properties = model.properties
  console.log(properties.getProperty(complexTypeInst, 'name'))
  console.log(properties.getProperty(simpleBodyInst, 'body'))
  console.log(properties.getProperty(attributesInst, 'attrs'))

  //
  // const foo = model.createAny('vendor:Foo', 'http://vendor', { value: 'bar' })
  // const container = model.createAny('my:Container', 'http://my', { any: [foo] })
  // console.log(foo, container)
</script>

<template>
  <div></div>
</template>
