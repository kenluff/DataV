import * as THREE from 'three'

/**
 * 点光源
 * @param {*} _viewer
 * @param {*} position
 * @param {*} option
 */
export default class PointLight {
  constructor(_viewer, position = [200, 200, 200], option = { color: 'rgb(255,255,255)' }) {
    this.viewer = _viewer
    const color = new THREE.Color(option.color)
    this.light = new THREE.PointLight(color)
    this.light.castShadow = true
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 10, 10),
      new THREE.MeshBasicMaterial({ color: color })
    )
    this.light.add(this.mesh)
    this.viewer.scene.add(this.light)
    this.setOption(option)
    this.setPosition(position)
  }

  /**
   * 设置光源参数
   * @param {*} option
   */
  setOption(option = {}) {
    this.light.intensity = option.intensity || 1 // 光照强度
    this.light.distance = option.distance || 200 // 光照距离
    this.light.decay = option.decay || 1 // 衰减
  }

  /**
   * 设置光源位置
   * @param x
   * @param y
   * @param z
   */
  setPosition([x, y, z]) {
    if (this.light) this.light.position.set(x || 0, y || 0, z || 0)
  }
}
