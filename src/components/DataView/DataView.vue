<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { chart } from '@/utils/chart/chart.js'
import { getAction } from '@/utils/request/index.js'

const option = ref({
  series: [
    {
      type: 'scatter',
      data: [
        {
          value: [0, 0],
          label: {
            formatter: [
              '{tc|Center Title}{titleBg|}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        },
        {
          value: [0, 1],
          label: {
            formatter: [
              '{titleBg|Left Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n')
          }
        },
        {
          value: [0, 2],
          label: {
            formatter: [
              '{titleBg|Right Title}',
              '  Content text xxxxxxxx {sunny|} xxxxxxxx {cloudy|}  ',
              '{hr|}',
              '  xxxxx {showers|} xxxxxxxx  xxxxxxxxx  '
            ].join('\n'),
            rich: {
              titleBg: {
                align: 'right'
              }
            }
          }
        }
      ],
      symbolSize: 1,
      label: {
        show: true,
        backgroundColor: '#ddd',
        borderColor: '#555',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000',
        fontSize: 14,
        rich: {
          titleBg: {
            backgroundColor: '#000',
            height: 30,
            borderRadius: [5, 5, 0, 0],
            padding: [0, 10, 0, 10],
            width: '100%',
            color: '#eee'
          },
          tc: {
            align: 'center',
            color: '#eee'
          },
          hr: {
            borderColor: '#777',
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          sunny: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image: 'https://echarts.apache.org/examples/data/asset/img/weather/sunny_128.png'
            }
          },
          cloudy: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image: 'https://echarts.apache.org/examples/data/asset/img/weather/cloudy_128.png'
            }
          },
          showers: {
            height: 30,
            align: 'left',
            backgroundColor: {
              image: 'https://echarts.apache.org/examples/data/asset/img/weather/showers_128.png'
            }
          }
        }
      }
    }
  ],
  xAxis: {
    show: false,
    min: -1,
    max: 1
  },
  yAxis: {
    show: false,
    min: 0
  }
})

const getData = () => {
  getAction('/weather').then((res) => {
    console.log(res)
  })
}

const c = new chart()
onMounted(() => {
  getData()
  c.createChart('charts', option.value)
})
onUnmounted(() => {
  c.destroyChart()
})
</script>

<template>
  <div id="charts" ref="charts" class="echarts"></div>
</template>

<style lang="scss" scoped>
.echarts {
  width: 600px;
  height: 400px;
}
</style>
