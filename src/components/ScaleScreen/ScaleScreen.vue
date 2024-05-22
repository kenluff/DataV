<script setup>
import { reactive, defineProps, watch, ref, nextTick, onMounted, onUnmounted } from 'vue'

const screenWrapper = ref()
const box = ref()

const state = reactive({
  width: 0,
  height: 0,
  originalWidth: 0,
  originalHeight: 0,
  observer: null
})
const props = defineProps({
  width: {
    type: Number || String,
    default: 1920
  },
  height: {
    type: Number || String,
    default: 1080
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  autoScale: {
    type: Boolean,
    default: true
  },
  delay: {
    type: Number,
    default: 500
  },
  boxStyle: {
    type: Object,
    default: () => ({})
  },
  wrapperStyle: {
    type: Object,
    default: () => ({})
  }
})
const styles = {
  box: {
    overflow: 'hidden',
    backgroundSize: `100% 100%`,
    background: `#000`,
    width: `100vw`,
    height: `100vh`
  },
  wrapper: {
    transitionProperty: `all`,
    transitionTimingFunction: `cubic-bezier(0.4, 0, 0.2, 1)`,
    transitionDuration: `500ms`,
    position: `relative`,
    overflow: `hidden`,
    zIndex: 100,
    transformOrigin: `left top`
  }
}

function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(
      () => {
        typeof fn === 'function' && fn.apply(null, args)
        clearTimeout(timer)
      },
      delay > 0 ? delay : 100
    )
  }
}

const onResize = debounce(async () => {
  await initSize()
  updateSize()
  updateScale()
}, props.delay)

// const initMutationObserver = () => {
//   const observer = (state.observer = new MutationObserver(() => {
//     onResize()
//   }))
//   observer.observe(screenWrapper.value, {
//     attributes: true,
//     attributeFilter: ['style'],
//     attributeOldValue: true
//   })
// }

const addListener = () => {
  window.addEventListener('resize', onResize)
  // initMutationObserver()
}

const clearListener = () => {
  window.removeEventListener('resize', onResize)
  // state.observer.disconnect()
}

const clearScreenWrapperStyle = () => {
  screenWrapper.value.style.transform = ''
  screenWrapper.value.style.margin = ''
}

const updateSize = () => {
  if (state.width && state.height) {
    screenWrapper.value.style.width = `${state.width}px`
    screenWrapper.value.style.height = `${state.height}px`
  } else {
    screenWrapper.value.style.width = `${state.originalHeight}px`
    screenWrapper.value.style.height = `${state.originalWidth}px`
  }
}

const autoScale = (scale) => {
  if (!props.autoScale) {
    return false
  }
  const domWidth = screenWrapper.value.clientWidth
  const domHeight = screenWrapper.value.clientHeight
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight
  screenWrapper.value.style.transform = `scale(${scale},${scale})`
  let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
  let my = Math.max((currentHeight - domHeight * scale) / 2, 0)
  if (typeof props.autoScale === 'object') {
    !props.autoScale.x && (mx = 0)
    !props.autoScale.y && (my = 0)
  }
  screenWrapper.value.style.margin = `${my}px ${mx}px`
}

const updateScale = () => {
  const currentWidth = document.body.clientWidth
  const currentHeight = document.body.clientHeight

  const realWidth = state.width || state.originalWidth
  const realHeight = state.height || state.originalHeight

  const widthScale = currentWidth / +realWidth
  const heightScale = currentHeight / +realHeight

  if (props.fullScreen) {
    screenWrapper.value.style.transform = `scale(${widthScale},${heightScale})`
    return false
  }

  const scale = Math.min(widthScale, heightScale)
  autoScale(scale)
}

const initSize = () => {
  return new Promise((resolve) => {
    box.value.scrollLeft = 0
    box.value.scrollTop = 0
    nextTick(() => {
      if (props.width && props.height) {
        state.width = props.width
        state.height = props.height
      } else {
        state.width = screenWrapper.value.clientWidth
        state.height = screenWrapper.value.clientHeight
      }

      if (!state.originalHeight || !state.originalWidth) {
        state.originalWidth = window.screen.width
        state.originalHeight = window.screen.height
      }

      resolve()
    })
  })
}
watch(
  () => props.autoScale,
  async (value) => {
    if (value) {
      onResize()
      addListener()
    } else {
      clearListener()
      clearScreenWrapperStyle()
    }
  }
)
onMounted(() => {
  nextTick(async () => {
    await initSize()
    updateSize()
    updateScale()
    addListener()
    // initMutationObserver()
  })
})
onUnmounted(() => {
  clearListener()
  // state.observer.disconnect()
})
</script>

<template>
  <section ref="box" :style="{ ...styles.box, ...boxStyle }" class="v-screen-box">
    <div ref="screenWrapper" :style="{ ...styles.wrapper, ...wrapperStyle }" class="screen-wrapper">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
