import * as echarts from 'echarts'
export class chart {
  constructor() {
    this.chart = null
  }

  createChart(id, option) {
    this.chart = echarts.init(document.getElementById(id))
    this.chart.setOption(option)
  }

  destroyChart() {
    echarts.dispose
  }
}
