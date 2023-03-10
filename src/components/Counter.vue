<!--
 * @Author: Feng
 * @Description: 计数示例代码
-->
<script setup lang="ts">
import { Button as aButton } from 'ant-design-vue'
const props = defineProps(['foo'])

console.log(props.foo)
const name = ref('313')

const { count, inc, dec } = useCounter(props.foo)
</script>

<template>
  <div>
    {{ count }}
    <aButton @click="inc()">
      +
    </aButton>
    <div>{{ name }}</div>
    <aButton @click="dec()">
      -
    </aButton>
    <slot :text="count" />
  </div>
</template>
