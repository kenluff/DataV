import * as THREE from 'three'

/**
 * 聚光灯,锥形光
 * @param {*} _viewer
 * @param {*} position
 * @param {*} option
 */
export default class SpotLight {
  constructor(_viewer, position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    this.viewer = _viewer
    const color = new THREE.Color(option.color)
    this.light = new THREE.SpotLight(color)
    this.light.castShadow = true
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 10, 10),
      new THREE.MeshBasicMaterial({ color: color })
    )
    this.viewer.scene.add(this.light)
    this.setOption(option)
    this.setPosition(position)
  }

  /**
   * 设置光源参数
   * @param {*} option
   */
  setOption(option = {}) {
    this.light.intensity = option.intensity || 20 // 光照强度
    this.light.angle = option.angle || 1 // 光照角度
    this.light.distance = option.distance || 200 // 光照距离
    this.light.decay = option.decay || 1 // 衰减
    this.light.castShadow = true
    this.light.shadow.mapSize.width = option.shadowMapWidth || 1024 // 阴影贴图宽度
    this.light.shadow.mapSize.height = option.shadowMapHeight || 1024 // 阴影贴图高度
    this.light.shadow.camera.near = option.shadowCameraNear || 0.1 // 阴影相机最近距离
    this.light.shadow.camera.far = option.shadowCameraFar || 40000 // 阴影相机最远距离
    this.light.shadow.camera.fov = option.shadowCameraFov || 30 // 阴影相机视角
  }
}
