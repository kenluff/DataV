<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

const screenDom = ref(null)

const init = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20)
  camera.position.set(-1.8, 0.6, 2.7)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  screenDom.value.appendChild(renderer.domElement)

  new RGBELoader().setPath('/textures/').load('royal_esplanade_1k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
    renderer.render(scene, camera)

    const loader = new GLTFLoader().setPath('/glTF/')
    loader.load('DamagedHelmet.gltf', (gltf) => {
      const model = gltf.scene
      scene.add(model)
      renderer.render(scene, camera)
    })
  })

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
  })
  controls.minDistance = 2
  controls.maxDistance = 10
  controls.target.set(0, 0, -0.2)
  controls.update()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.render(scene, camera)
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
