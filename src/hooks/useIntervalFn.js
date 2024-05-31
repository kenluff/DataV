import { useIntervalFn } from '@vueuse/core'
import { useSettingStore } from '@/stores/setting/setting.ts'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export function useIntervalFnWithSetting(callback, interval, immediate = true) {
  const settingStore = useSettingStore()
  const { globalSetting } = storeToRefs(settingStore)
  const refreshTime = ref()
  refreshTime.value = settingStore.getRefresh()
  const intervalTime = interval || refreshTime.value
  console.log('useIntervalFnWithSetting', intervalTime)
  if (intervalTime === 0) {
    return {
      start: () => {},
      stop: () => {}
    }
  }
  const { start, stop } = useIntervalFn(callback, intervalTime, {
    immediate,
    immediateCallback: true
  })

  return {
    start: () => {
      if (globalSetting.value.autoRefresh) {
        start()
      }
    },
    stop
  }
}
