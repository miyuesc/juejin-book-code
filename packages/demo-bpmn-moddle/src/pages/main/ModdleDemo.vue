<script setup>
  import { computed, ref } from 'vue'
  import { parseNameNS } from 'moddle'

  const catchErrorMsg = (...args) => {
    try {
      return parseNameNS(...args)
    } catch (e) {
      return `Throw Error:  ${e?.message || e}`
    }
  }

  const value1 = ref('asdf:bar')
  const parseValue1 = computed(() => catchErrorMsg(value1.value))

  const value2 = ref('bar')
  const parseValue2 = computed(() => catchErrorMsg(value2.value))

  const value3 = ref('bar')
  const prefix3 = ref('default')
  const parseValue3 = computed(() => catchErrorMsg(value3.value, prefix3.value))

  const value4 = ref('asdf:foo:bar')
  const parseValue4 = computed(() => catchErrorMsg(value4.value))
</script>

<template>
  <div class="w-100% flex flex-col p2 flex-gap-[20px]">
    <div class="font-700">ParseName</div>
    <div class="flex flex-row flex-items-center flex-gap-[20px]">
      <n-input v-model:value="value1" />
      <div class="w-50% flex-shrink-0">{{ parseValue1 }}</div>
    </div>
    <div class="flex flex-row flex-items-center flex-gap-[20px]">
      <n-input v-model:value="value2" />
      <div class="w-50% flex-shrink-0">{{ parseValue2 }}</div>
    </div>
    <div class="flex flex-row flex-items-center flex-gap-[20px]">
      <n-input v-model:value="value3" />
      <n-input v-model:value="prefix3" />
      <div class="w-50% flex-shrink-0">{{ parseValue3 }}</div>
    </div>
    <div class="flex flex-row flex-items-center flex-gap-[20px]">
      <n-input v-model:value="value4" />
      <div class="w-50% flex-shrink-0">{{ parseValue4 }}</div>
    </div>
  </div>
</template>
