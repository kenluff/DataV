<script setup>
import { useSettingStore } from '@/stores/setting/setting.js'
import { Setting } from '@element-plus/icons-vue'
import SettingView from '@/components/setting/SettingView.vue'

const { setSettingShow } = useSettingStore()
</script>
<template>
  <div>
    <div class="settings">
      <el-icon @click="setSettingShow(true)" size="30">
        <Setting />
      </el-icon>
    </div>
    <setting-view />
  </div>
</template>
<style lang="scss" scoped></style>
