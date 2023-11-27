<script setup>
  import { Parser, decode } from 'saxen'
  import sampleXML from '../../utils/sample.js'
  import { createStack } from '../../utils/index.js'

  // decode 部分测试
  console.log('---------- decode 部分测试 -------------')
  const specialChars = ['&amp;', '&apos;', '&gt;', '&lt;', '&quot;', '&Quot;', '&QUOT;', '&#39;', '&#38;', '&#0123;', '&#x0130;', '&raquo;', '&constructor;', '&#NaN;']
  specialChars.forEach(function (char) {
    console.log(char, '=> ', decode(char))
  })
  const specialCharsStr = specialChars.sort(() => Math.random() - 0.5).join('')
  console.log(specialCharsStr, '=> ', decode(specialCharsStr))

  // parser 解析器部分测试
  console.log('\n\n---------- parser 部分测试 -------------')

  const parser = new Parser()
  const proxyParser = new Parser({ proxy: true })
  console.log(parser, proxyParser)

  // parser error 示例
  // parser.parse(`<div></div>`) // ✅
  // parser.parse(`<doc><element id="sample>error"></element></doc>`) // ✅
  // parser.parse(`<doc> \n<element id="sample>error" > \n </element></doc>`) // ✅
  // parser.parse(`\n\x01asdasd`) // Error: missing start tag
  // parser.parse(`<!-- HELLO`) // Error:unclosed comment
  // parser.parse(`</a>`) // Error:missing open tag
  // parser.parse(`<open /`) // Error: unclosed tag
  // parser.parse(`<=div></=div>`) // Error:illegal first char nodeName
  // parser.parse(`<div=></div=>`) // Error:illegal first char nodeName
  // parser.parse(`<a><b></c></b></a>`) // Error:closing tag mismatch
  // parser.parse(`<root><foo>`) // Error:unexpected end of file
  // parser.parse(`<root></rof</root>`) // Error:closing tag mismatch
  // parser.parse(`a<root />`) // Error:non-whitespace outside of root node
  // parser.parse(`<root />a`) // Error:non-whitespace outside of root node
  // parser.parse(`<a$uri:foo xmlns:a$uri="http://not-atom" />`) // Error:invalid nodeName

  // parse xml 解析过程
  //
  parser.on('openTag', function (elementName, attrGetter, decodeEntities, selfClosing, contextGetter) {
    if (elementName === 'bpmn:sequenceFlow') {
      console.log('parser openTag ', 'elementName', elementName)
      console.log('parser openTag ', 'attrGetter', attrGetter())
    }
  })
  // parser.on('closeTag', function (elementName, decodeEntities, selfClosing, contextGetter) {
  //   console.log('parser closeTag ', 'elementName', elementName)
  // })

  proxyParser.on('openTag', function (element, decodeEntities, selfClosing, contextGetter) {
    if (element.name === 'bpmn:sequenceFlow') {
      console.log('proxyParser openTag ', 'element', { ...element })
    }
  })
  // proxyParser.on('closeTag', function (element, selfClosing, contextGetter) {
  //   console.log('proxyParser closeTag ', 'element', element)
  // })

  parser.parse(sampleXML)
  proxyParser.parse(sampleXML)

  // 解析一个完整的 xml
  const stack = createStack()
  stack.push({})
  const xmlParser = new Parser({ proxy: true })
  xmlParser.ns({
    'http://www.omg.org/spec/BPMN/20100524/MODEL': 'bpmn',
    'http://www.omg.org/spec/BPMN/20100524/DI': 'bpmndi',
    'http://www.omg.org/spec/DD/20100524/DI': 'di',
    'http://www.omg.org/spec/DD/20100524/DC': 'dc',
    'http://www.w3.org/2001/XMLSchema-instance': 'xsi'
  })
  xmlParser
    .on('openTag', function (obj, decodeStr, selfClosing, getContext) {
      var attrs = obj.attrs || {}
      var decodedAttrs = Object.keys(attrs).reduce(function (d, key) {
        var value = decodeStr(attrs[key])
        d[key] = value
        return d
      }, {})
      var node = {
        name: obj.name,
        originalName: obj.originalName,
        attributes: decodedAttrs,
        ns: obj.ns
      }
      handleOpen(node, getContext)
    })
    .on('closeTag', handleClose)

    .on('text', function (text, decodeEntities, getContext) {
      handleText(decodeEntities(text), getContext)
    })

  xmlParser.parse(sampleXML)

  console.log(stack)

  function handleOpen(node) {
    const handler = stack.peek()
    try {
      !handler.children && (handler.children = [])
      handler.children.push(node)
      stack.push(node)
    } catch (err) {
      console.log(err)
    }
  }
  function handleClose() {
    stack.pop()
  }
  function handleText(text) {}
</script>

<template>
  <div>
    <p>打开控制台查看输出</p>
  </div>
</template>

<style scoped></style>
