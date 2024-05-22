<script setup>
import { storeToRefs } from 'pinia'
import SettingButton from '@/components/setting/SettingButton.vue'
import ScaleScreen from '@/components/ScaleScreen/ScaleScreen.vue'
import DataView from '@/components/DataView/DataView.vue'
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
    <div class="flex flex-row justify-end">
      <setting-button />
    </div>
    <data-view />
  </scale-screen>
</template>
