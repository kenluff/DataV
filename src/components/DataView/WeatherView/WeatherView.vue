<script setup>
import { currentApi } from '../../../utils/request/index.js'

currentApi.get('list').then((res) => {
  console.log(res)
})
</script>
<template>
  <div></div>
</template>
<style lang="scss" scoped></style>
