<!--
 * @Author: Feng
 * @Description: 计数示例代码
-->
<script setup lang="ts">
const props = defineProps<{
  initial: number
}>()
const name = ref('313')

const { count, inc, dec } = useCounter(props.initial)
</script>

<template>
  <div>
    {{ count }}
    <button class="inc" @click="inc()">
      +
    </button>
    <div>{{ name }}</div>
    <button class="dec" @click="dec()">
      -
    </button>
  </div>
</template>
