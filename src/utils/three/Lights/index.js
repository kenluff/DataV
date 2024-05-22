import SunLensflare from './SunLensflare.js'
import DirectionalLight from './DirectionalLight.js'
import AmbientLight from './AmbientLight.js'
import PointLight from './PointLight.js'
import SpotLight from './SpotLight.js'
import RectAreaLight from './RectAreaLight.js'

export default class Light {
  constructor(_viewer) {
    this.viewer = _viewer
    this.lightList = []
    this.sunLensflare = undefined
  }

  /**
   * 添加平行光,定向光
   * @param position 光源位置
   * @param option 光源配置
   */
  addDirectionalLight(position = [200, 200, 200], option = { color: 'rgb(255,255,255)' }) {
    const directionalLight = new DirectionalLight(this.viewer, position, option)
    this.lightList.push(directionalLight)
    return directionalLight
  }

  /**
   * 添加环境光源
   */
  addAmbientLight() {
    const ambientLight = new AmbientLight(this.viewer)
    this.lightList.push(ambientLight)
    return ambientLight
  }

  /**
   * 添加点状光源
   * @param position
   * @param option
   */
  addPointLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const pointLight = new PointLight(this.viewer, position, option)
    this.lightList.push(pointLight)
    return pointLight
  }

  /**
   * 添加聚光灯,锥形光源
   * @param position
   * @param option
   */
  addSpotLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const pointLight = new SpotLight(this.viewer, position, option)
    this.lightList.push(pointLight)
    return pointLight
  }

  /**
   * 添加矩形光源
   * @param position
   * @param option
   */
  addRectAreaLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const rectAreaLight = new RectAreaLight(this.viewer, position, option)
    this.lightList.push(rectAreaLight)
    return rectAreaLight
  }

  /**
   * 添加炫光
   * @param x
   * @param y
   * @param z
   */
  addSunLensflare(x = 200, y = 200, z = 200) {
    this.sunLensflare = new SunLensflare(this.viewer)
    this.sunLensflare.addToScene(x, y, z)
  }

  /**
   * 移除灯光
   * @param light 灯光
   */
  removeLight(light) {
    this.viewer.scene.remove(light)
  }
}