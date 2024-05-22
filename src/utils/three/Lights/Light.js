export default class Light {
  constructor(_viewer) {
    this.viewer = _viewer
    this.light = undefined
  }

  /**
   * 设置光源位置
   * @param x
   * @param y
   * @param z
   */
  setPosition([x, y, z]) {
    if (this.light) this.light.position.set(x, y, z)
  }
}
