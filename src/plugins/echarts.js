// vue-echarts
import { BarChart, PieChart, MapChart, EffectScatterChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
  MarkPointComponent
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import VueECharts from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  MapChart,
  EffectScatterChart,
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  VisualMapComponent,
  GeoComponent,
  MarkPointComponent
])

export const registerEcharts = (app) => {
  app.component('v-chart', VueECharts)
}
