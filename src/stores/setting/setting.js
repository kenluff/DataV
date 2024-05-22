import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore(
  'setting',
  () => {
    const settingShow = ref(false)
    const globalSetting = ref({
      isScale: false,
      isGlobalPoll: true,
      isGlobalSwiper: true
    })

    function setSettingShow(val) {
      console.log('setSettingShow', val)
      settingShow.value = val
    }

    function setIsScale(val) {
      console.log('setIsScale', val)
      globalSetting.value.isScale = val
    }

    function setIsGlobalPoll(val) {
      console.log('setIsGlobalPoll', val)
      globalSetting.value.isGlobalPoll = val
    }

    function setIsGlobalSwiper(val) {
      console.log('setIsGlobalSwiper', val)
      globalSetting.value.isGlobalSwiper = val
    }

    return {
      settingShow,
      globalSetting,
      setSettingShow,
      setIsScale,
      setIsGlobalPoll,
      setIsGlobalSwiper
    }
  },
  {
    persist: true
  }
)
