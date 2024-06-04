import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore(
  'setting',
  () => {
    const settingShow = ref(true)
    const globalSetting = ref({
      isScale: true,
      isGlobalPoll: true,
      isGlobalSwiper: true
    })
    const defaultOption = ref({
      step: 4, // 数值越大速度滚动越快
      hover: true, // 是否开启鼠标悬停stop
      wheel: false, //在开启鼠标悬停的情况下是否开启滚轮滚动，默认不开启
      openWatch: true, // 开启数据实时监控刷新dom
      direction: 1, // 0向下 1向上 2向左 3向右
      limitScrollNum: 4, // 开始无缝滚动的数据量 this.dataList.length
      singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
      singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
      singleWaitTime: 3000, // 单步运动停止的时间(默认值1000ms)
      autoRefresh: true, // 是否开启自动刷新
      autoRefreshTime: 60000 // 自动刷新时间2分钟
    })

    function getRefresh() {
      return defaultOption.value.autoRefresh ? defaultOption.value.autoRefreshTime : 0
    }

    function setIsScale(p) {
      globalSetting.value.isScale = p
    }

    function setSettingShow(p) {
      console.log('setSettingShow', p)
      settingShow.value = p
    }

    function setIsGlobalPoll(p) {
      globalSetting.value.isGlobalPoll = p
    }

    function setIsGlobalSwiper(p) {
      globalSetting.value.isGlobalSwiper = p
    }

    return {
      globalSetting,
      setIsScale,
      setIsGlobalPoll,
      setIsGlobalSwiper,
      defaultOption,
      setSettingShow,
      settingShow,
      getRefresh
    }
  },
  {
    persist: true
  }
)
