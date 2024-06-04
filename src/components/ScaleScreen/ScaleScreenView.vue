<script setup>
import { storeToRefs } from 'pinia'
import SettingButton from '@/components/setting/SettingButton.vue'
import ScaleScreen from '@/components/ScaleScreen/ScaleScreen.vue'
import { useSettingStore } from '@/stores/setting/setting.js'

const settingStore = useSettingStore()
const { globalSetting } = storeToRefs(settingStore)
</script>

<template>
  <scale-screen
    :autoScale="globalSetting.isScale"
    :boxStyle="{
      background: 'rgb(240, 233, 233)',
      overflow: globalSetting.isScale ? 'hidden' : 'auto'
    }"
  >
    <div class="setting-button">
      <setting-button />
    </div>
    <slot></slot>
  </scale-screen>
</template>

<style scoped>
.setting-button {
  position: absolute;
  top: 24px;
  right: 0;
  z-index: 100;
}
</style>
