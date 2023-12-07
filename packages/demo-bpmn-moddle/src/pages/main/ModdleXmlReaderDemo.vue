<script setup>
  import { Moddle } from 'moddle'
  import { Reader } from 'moddle-xml'

  import properties from '../../model/properties.json'
  import propertiesExtended from '../../model/properties-extended.json'

  const xml = `<props:root xmlns:props="http://properties">
  <props:containedCollection id="C_5">
    <props:complex id="C_1" />
    <props:complex id="C_2">complex body string</props:complex>
    <props:complex id="C_3" />
  </props:containedCollection>
  <props:attributeReferenceCollection id="C_4" refs="C_2 C_3 C_5 C-8" />
  <props:complexAttrsCol xmlns:props="http://properties">
    <props:attrs integerValue="10" />
    <props:attrs booleanValue="true" />
  </props:complexAttrsCol>
</props:root>`

  const model = new Moddle([properties, propertiesExtended])
  const reader = new Reader(model)

  const parseXML = async () => {
    const rootHandler = reader.handler('props:Root')

    console.log('rootHandler', rootHandler)

    const root = await reader.fromXML(xml, rootHandler)
    console.log(root)
  }

  parseXML()

  const xml2 = `<props:root xmlns:props="http://properties">
  <props:containedCollection id="C_5">
    <props:complex id="C_1" />
    <props:complex id="C_2">complex body string</props:complex>
    <props:complex id="C_3" />
  </props:containedCollection>
</props:root>`

  const parseXML2 = async () => {
    const rootHandler = reader.handler('props:Base')

    console.log('rootHandler', rootHandler)

    const root = await reader.fromXML(xml2, rootHandler)
    console.log(root)
  }

  parseXML2()
</script>

<template>
  <div>
    <p>打开控制台查看输出</p>
  </div>
</template>
