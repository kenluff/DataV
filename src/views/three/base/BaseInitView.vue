<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import * as dat from 'dat.gui'

const screenDom = ref(null)
const scene = new THREE.Scene()
const gui = new dat.GUI()

onMounted(() => {
  init()
})

const init = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  screenDom.value.appendChild(renderer.domElement)

  const geometry = new THREE.BoxGeometry(1, 1, 1)

  const textureLoader = new THREE.TextureLoader()
  const loaderTexture = textureLoader.load('/images/wall.jpg')
  loaderTexture.center.set(0.5, 0.5)
  loaderTexture.rotation = Math.PI / 4

  const material = new THREE.MeshPhongMaterial({
    map: loaderTexture
  })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  camera.position.z = 5

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2, 4)
  scene.add(light)

  gui.add(cube.position, 'x').min(0).max(5)

  const animate = () => {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  })
}
</script>

<template>
  <div>
    <div id="three-dom" ref="screenDom"></div>
  </div>
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
