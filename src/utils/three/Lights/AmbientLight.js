import * as THREE from 'three'

/**
 * 环境光
 * @param {*} _viewer
 * @param {*} option
 */
export default class AmbientLight {
  constructor(_viewer, option = { color: '0x404040' }) {
    this.viewer = _viewer
    this.light = new THREE.AmbientLight(new THREE.Color(option.color))
    this.setOption(option)
    this.viewer.scene.add(this.light)
  }

  /**
   * 设置光源参数
   * @param {*} option
   */
  setOption(option = {}) {
    this.light.intensity = option.intensity || 1 // 光照强度
  }
}
