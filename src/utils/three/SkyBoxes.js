import * as THREE from 'three'

// 天空盒时间类型
const skyboxType = {
  day: 'day',
  dusk: 'dusk',
  night: 'night'
}

export default class SkyBoxes {
  constructor(viewer) {
    this.viewer = viewer
  }

  /**
   * @param {*} type 天空盒子类型
   */
  setSkyBox(type = skyboxType.day) {
    const loaderBox = new THREE.CubeTextureLoader()
    this.viewer.scene.background = loaderBox.load([
      `/images/skybox/${type}/posx.jpg`,
      `/images/skybox/${type}/negx.jpg`,
      `/images/skybox/${type}/posy.jpg`,
      `/images/skybox/${type}/negy.jpg`,
      `/images/skybox/${type}/posz.jpg`,
      `/images/skybox/${type}/negz.jpg`
    ])
  }
}
