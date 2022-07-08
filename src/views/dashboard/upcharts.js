import * as echarts from 'echarts'

export default {
  methods: {
    async fetchData(days = [], num = []) {
      // 基于准备好的dom，初始化echarts实例
      this.charts = echarts.init(document.getElementById('main'))
      // 绘制图表
      this.charts.setOption({
        xAxis: {
          type: 'category',
          data: days.reverse()
        },
        yAxis: {
          type: 'value',
          max: Math.max(...num) + (Math.max(...num) / 5)
        },
        title: {
          text: '近半月图片上传日分布统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name:'上传张数',
            data: num.reverse(),
            type: 'line',
            smooth: true,
            symbol: 'none',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ]),
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgba(255,255,255,0)'
                }
              ])
            },
          }
        ]
      })
    }
  }
}
