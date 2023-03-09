<!--
 * @Author: Feng
 * @Description: / 首页
-->
<script setup lang="ts">
const user = useUserStore()
const name = $ref(user.savedName)
const router = useRouter()
const go = () => {
    if (name)
        router.push(`/hi/${encodeURIComponent(name)}`)
}
const { t } = useI18n()
</script>

<template>
  <div>
    <p mt20>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Welcome to galaxy
      </a>
    </p>
    <p>
      <em text-sm op75>{{ t('intro.desc') }}</em>
    </p>

    <div py-4 />

    <input
      id="input"
      v-model="name"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200"
      outline="none active:none"
      @keydown.enter="go"
    >

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>

<style lang="scss">
div {
    font-size: 14px;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
