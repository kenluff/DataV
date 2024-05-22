<script setup>
import { useSettingStore } from '@/stores/setting/setting.js'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()
const { globalSetting, settingShow } = storeToRefs(settingStore)

const isScaleChange = (flag) => {
  settingStore.setIsScale(flag)
}
const isGlobalPollChange = (flag) => {
  settingStore.setIsGlobalPoll(flag)
}
const isGlobalSwiperChange = (flag) => {
  settingStore.setIsGlobalSwiper(flag)
}
const isSettingShowChange = () => {
  settingStore.setSettingShow(false)
}
</script>
<template>
  <el-drawer v-model="settingShow" direction="rtl" size="360px" @close="isSettingShowChange()">
    <template #header>
      <h2 class="setting-title">设置</h2>
    </template>
    <template #default>
      <div class="left_shu">全局设置</div>
      <div class="setting_item">
        <span class="setting_label">
          是否进行自动适配<span class="setting_label_tip">(默认分辨率1920*1080)</span>:
        </span>
        <div class="setting_content">
          <el-radio-group v-model="globalSetting.isScale" @change="(flag) => isScaleChange(flag)">
            <el-radio label="是" :value="true">是</el-radio>
            <el-radio label="否" :value="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="left_shu">实时监测</div>
      <div class="setting_item">
        <span class="setting_label">
          设置全局自动轮询: <span class="setting_label_tip"></span>
        </span>
        <div class="setting_content">
          <el-radio-group
            v-model="globalSetting.isGlobalPoll"
            @change="(flag) => isGlobalPollChange(flag)"
          >
            <el-radio label="是" :value="true">是</el-radio>
            <el-radio label="否" :value="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="setting_item">
        <span class="setting_label"> 设置全局轮播: </span>
        <div class="setting_content">
          <el-radio-group
            v-model="globalSetting.isGlobalSwiper"
            @change="(flag) => isGlobalSwiperChange(flag)"
          >
            <el-radio label="是" :value="true">是</el-radio>
            <el-radio label="否" :value="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.setting-title {
  font-size: 20px;
  color: #000;
  font-weight: 900;
  text-align: center;
  line-height: 1;
}

.left_shu {
  color: #000;
  font-weight: 900;
  position: relative;
  text-indent: 10px;
  padding: 16px 0 10px 0;
  line-height: 1;

  &::before {
    display: block;
    content: ' ';
    height: 16px;
    width: 4px;
    border-radius: 2px;
    background: #0072ff;
    position: absolute;
    left: 0;
  }
}

.setting_item {
  font-size: 14px;
  line-height: 1.5;

  // display: flex;
  .setting_label {
    color: #555454;
  }

  .setting_label_tip {
    font-size: 12px;
    color: #838282;
  }
}
</style>
