import * as THREE from 'three'

/**
 * 平行光,定向光
 * @param {*} _viewer
 * @param {*} position
 * @param {*} option
 */
export default class DirectionalLight {
  constructor(_viewer, position = [200, 200, 200], option = { color: 'rgb(255,255,255)' }) {
    this.viewer = _viewer
    this.light = new THREE.DirectionalLight(new THREE.Color(option.color))
    this.setPosition(position)
    this.setOption(option)
    this.viewer.scene.add(this.light)
  }

  /**
   * 设置光源参数
   * @param {*} option
   */
  setOption(option = {}) {
    const light = this.light
    light.intensity = option.intensity || 2 // 光照强度
    light.castShadow = option.castShadow || true // 是否产生阴影
    light.shadow.mapSize.width = option.shadowMapWidth || 2048 // 阴影贴图宽度
    light.shadow.mapSize.height = option.shadowMapHeight || 2048 // 阴影贴图高度
    // 阴影
    const d = 80
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d
    light.shadow.camera.bottom = -d
    light.shadow.bias = -0.0005 // 阴影偏移
    light.shadow.camera.far = 2000 // 阴影距离
    light.shadow.camera.near = 0.01 // 阴影最近距离
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
