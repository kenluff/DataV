<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'

const screenDom = ref(null)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

function init(dom) {
  dom.value.appendChild(renderer.domElement)
  const fireTexture = new THREE.TextureLoader().load(
    'https://threejs.org/examples/textures/sprites/spark1.png'
  )

  const particleCount = 1800,
    particles = new THREE.BufferGeometry(),
    positions = new Float32Array(particleCount * 3),
    colors = new Float32Array(particleCount * 3),
    color = new THREE.Color()

  for (let i = 0; i < particleCount; i++) {
    let pX = Math.random() * 3 - 1.5,
      pY = Math.random() * 3 - 1.5,
      pZ = Math.random() * 3 - 1.5

    positions[i * 3] = pX
    positions[i * 3 + 1] = pY
    positions[i * 3 + 2] = pZ

    color.setHSL((pY + 1) / 2, 1.0, 0.5)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    map: fireTexture,
    transparent: true,
    depthTest: false,
    blending: THREE.AdditiveBlending
  })

  const particleSystem = new THREE.Points(particles, particleMaterial)
  scene.add(particleSystem)

  function animate() {
    requestAnimationFrame(animate)

    for (var i = 0; i < particleCount; i++) {
      var positions = particleSystem.geometry.attributes.position.array
      if (positions[i * 3 + 1] < -1.5) {
        positions[i * 3 + 1] = Math.random() * 3 + 1
      } else {
        positions[i * 3 + 1] -= 0.01
      }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true
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
  init(screenDom)
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
