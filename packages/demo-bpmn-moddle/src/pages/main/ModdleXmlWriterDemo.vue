<script setup>
  import { Moddle } from 'moddle'
  import { Writer } from 'moddle-xml'

  import properties from '../../model/properties.json'
  import propertiesExtended from '../../model/properties-extended.json'

  const model = new Moddle([properties, propertiesExtended])
  const writer = new Writer({ format: true })

  // 1. 特殊 serialize 序列化
  const body = model.create('props:SimpleBody', { body: '${ foo < bar }' })
  const root = model.create('props:WithBody', { someBody: body })
  const xml1 = writer.toXML(root)
  console.log(xml1)
</script>

<template>
  <div>
    <p>打开控制台查看输出</p>
  </div>
</template>
