<script setup>
  import { Moddle } from 'moddle'
  import Properties from '../../model/properties.json'
  import Base from '../../model/extension/base.json'
  import Custom from '../../model/extension/custom.json'

  const model = new Moddle([Properties])

  console.log(model)

  // getType
  const ComplexType = model.getType('props:Complex')
  const SimpleBody = model.getType('props:SimpleBody')
  const Attributes = model.getType('props:Attributes')
  console.log(ComplexType.toString(), '\n', SimpleBody.toString(), '\n', Attributes.toString())

  // initiate
  const complexTypeInst = model.create('props:Complex', { name: 'complex', id: 'complex', idx: 1 })
  const simpleBodyInst = model.create('props:SimpleBody', { body: 'simple', idx: 2 })
  const attributesInst = model.create('props:Attributes', { attrs: [complexTypeInst, simpleBodyInst], idx: 3 })
  console.log(complexTypeInst, simpleBodyInst, attributesInst)

  // serialize
  const instance1 = model.create('props:Attributes')
  instance1.set('props:booleanValue', true)
  instance1.set('props:integerValue', -1000)
  const instance2 = model.create('props:Attributes')
  instance1.set('props:booleanValue', false)
  instance1.set('props:realValue', -0.02)
  const complexAttrs = model.create('props:ComplexAttrs', { attrs: instance1 })
  const complexAttrsCol = model.create('props:ComplexAttrsCol', { attrs: [instance1, instance2] })
  console.log('serialize', complexAttrs, complexAttrsCol)

  // getProperty
  const properties = model.properties
  console.log(properties.getProperty(complexTypeInst, 'name'))
  console.log(properties.getProperty(simpleBodyInst, 'body'))
  console.log(properties.getProperty(attributesInst, 'attrs'))

  //
  // const foo = model.createAny('vendor:Foo', 'http://vendor', { value: 'bar' })
  // const container = model.createAny('my:Container', 'http://my', { any: [foo] })
  // console.log(foo, container)

  const model2 = new Moddle([Base, Custom])

  console.log(model2)
  console.log(model2.getPackages())

  console.log(model2.registry.getEffectiveDescriptor('c:CustomRoot'))

  const Root = model2.getType('b:Root')
  const CustomRoot = model2.getType('c:CustomRoot')
  console.log(new Root())
  console.log(new CustomRoot())

  //
  const anyInstance = model.createAny('other:Foo', 'http://other', {
    bar: 'BAR'
  })
  console.log('anyInstance', anyInstance)
</script>

<template>
  <div>
    <p>打开控制台查看输出</p>
  </div>
</template>
