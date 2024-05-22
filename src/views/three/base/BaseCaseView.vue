<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const screenDom = ref(null)

const init = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 1.5)
  scene.add(camera)

  const textureLoader = new THREE.TextureLoader()
  const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
  const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
  const doorAoTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
  const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
  const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
  const doorRoughness = textureLoader.load('/textures/door/roughness.jpg')
  const doorNormal = textureLoader.load('/textures/door/normal.jpg')
  doorColorTexture.wrapT = THREE.RepeatWrapping

  const geometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200)

  const material = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAoTexture,
    aoMapIntensity: 1,
    displacementMap: doorHeightTexture,
    displacementScale: 0.05,
    metalnessMap: doorMetalnessTexture,
    metalness: 0.7,
    roughnessMap: doorRoughness,
    roughness: 0.2,
    normalMap: doorNormal,
    normalScale: new THREE.Vector2(0.25, 0.25)
  })

  geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))

  const door = new THREE.Mesh(geometry, material)
  scene.add(door)

  const light = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(light)

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
  dirLight.position.set(10, 10, 10)
  scene.add(dirLight)

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enabled = true

  screenDom.value.appendChild(renderer.domElement)

  const render = () => {
    controls.update()
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
