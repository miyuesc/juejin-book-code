<script setup>
  import { Parser, decode } from 'saxen'

  const parser = new Parser()
  console.log(parser)

  var counter = 0

  parser.on('openTag', function (el, getAttrs, decodeEntities) {
    counter++

    const attrs = getAttrs()

    console.log(attrs)

    console.log(decodeEntities(attrs.encoded))
  })

  const specialChars = ['&amp;', '&apos;', '&gt;', '&lt;', '&quot;', '&Quot;', '&QUOT;', '&#39;', '&#38;', '&#0123;', '&#x0130;', '&raquo;', '&constructor;', '&#NaN;']

  // when
  parser.parse('<root xmlns="http://ns" encoded="' + specialChars.join('') + '" />')

  // then
  console.log(counter === 1, 'parsed one node')

  // const ns = parser.ns({
  //   'http://foo': 'foo',
  //   'http://bar': 'bar'
  // })
  // console.log('parser ns', ns)
  //
  // parser.on('openTag', function (elementName, attrGetter) {
  //   console.log('openTag', 'elementName', elementName)
  //   console.log('openTag', 'attrGetter', attrGetter())
  // })
  //
  // parser.parse('<blub xmlns="http://foo" xmlns:bar="http://bar" bar:aa="A" />')
</script>

<template>
  <div>
    <p>打开控制台查看输出</p>
  </div>
</template>

<style scoped></style>
