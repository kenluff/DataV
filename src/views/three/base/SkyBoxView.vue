<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

const screenDom = ref(null)

const init = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  screenDom.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.target.set(0, 0, 0)
  controls.update()

  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(-1, 2, 4)
  scene.add(light)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshPhongMaterial({ color: '9f9' })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  camera.position.z = 5

  const loader = new THREE.TextureLoader()
  const texture = loader.load('/images/panorama.jpg', () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
    rt.fromEquirectangularTexture(renderer, texture)
    scene.background = rt.texture
  })

  const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    controls.update()
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
