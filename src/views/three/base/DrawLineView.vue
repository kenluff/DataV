<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'

const screenDom = ref(null)

const init = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  screenDom.value.appendChild(renderer.domElement)

  const material = new THREE.LineBasicMaterial({ color: 0x00ff00 })
  const points = []
  points.push(new THREE.Vector3(-10, 0, 0))
  points.push(new THREE.Vector3(0, 10, 0))
  points.push(new THREE.Vector3(10, 0, 0))

  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  const line = new THREE.Line(geometry, material)
  scene.add(line)

  const render = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  render()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div id="three-dom" ref="screenDom"></div>
</template>

<style lang="scss" scoped>
#three-dom {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
