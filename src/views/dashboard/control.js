import * as echarts from 'echarts'
import { parseTime } from '@/utils'

export default {
  data() {
    return {
      mem: null,
      disk: null,
      cpu: null,
      net: null,
      network: null
    }
  },
  methods: {
    manageOption(opt) {
      return {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: opt.title
        },
        legend: {
          top: '50px',
          left: 'center'
        },
        color: opt.color,
        series: [
          {
            top: 50,
            name: '当前区块',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: opt.data
          }
        ]
      }
    },
    cpuinfo(data) {
      if (!this.cpu) {
        let chartDom = document.getElementById('cpu')
        this.cpu = echarts.init(chartDom)
      }
      const { percent = 0 } = data
      let datainfo = [
        { value: percent, name: '负载' },
        { value: (100 - percent), name: '空闲' }
      ]
      let opt = this.manageOption({
        color: ['#fbc531', '#00a8ff'],
        title: 'CPU状态',
        data: datainfo
      })
      opt && this.cpu.setOption(opt)
    },
    diskinfo(data) {
      if (!this.disk) {
        var chartDom = document.getElementById('disk')
        this.disk = echarts.init(chartDom)
      }

      const { used = 0, total = 0, free = 0 } = data
      let datainfo = [
        { value: used, name: '已用' },
        { value: free, name: '可用' }
      ]
      let opt = this.manageOption({
        color: ['#ff6b6b', '#1dd1a1'],
        title: '储存空间使用明细',
        data: datainfo
      })

      opt && this.disk.setOption(opt)
    },
    meminfo(data) {
      if (!this.mem) {
        var chartDom = document.getElementById('mem')
        this.mem = echarts.init(chartDom)
      }
      const { total = 0, free = 0, used = 0, percent = 0 } = data
      let datainfo = [
        { value: used, name: '已用' },
        { value: free, name: '可用' }
      ]
      let opt = this.manageOption({
        color: ['#ff6b6b', '#1dd1a1'],
        title: '内存占用明细',
        data: datainfo
      })
      opt && this.mem.setOption(opt)
    },
    networkinfo(data) {
      if (!this.network) {
        var chartDom = document.getElementById('network')
        this.network = echarts.init(chartDom)
      }
      const { down = 0, up = 0 } = data
      let datainfo = [
        { value: up, name: '上行' },
        { value: down, name: '下行' }
      ]
      let opt = this.manageOption({
        color: ['#34ace0', '#33d9b2'],
        title: '网络上下行占比',
        data: datainfo
      })
      opt && this.network.setOption(opt)
    },
    netinfo(data) {
      if (!this.net) {
        const chartDom = document.getElementById('net')
        this.net = echarts.init(chartDom)
      }
      let up = []
      let down = []
      let time = []
      data.reverse()
      data.forEach(el => {
        up.push(Number(el[1]))
        down.push(Number(el[2]))
        time.push(parseTime(el[3] * 1000, '{h}:{i}:{s}'))
      })
      let option = {
        xAxis: {
          type: 'category',
          data: time,
        },
        legend: {
          data: ['下行', '上行']
        },
        title: {
          text: '网络流量出入(KB)'
        },
        yAxis: {
          type: 'value',
          min: 0,
          axisLabel: {
            formatter: '{value} KB'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
              formatter: '{value} KB'
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
            name: '下行',
            data: down,
            type: 'line',
            smooth: true,
            symbol: 'none',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(52,152,219)'
              },
              {
                offset: 1,
                color: 'rgb(26,188,156)'
              }
            ]),
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(119,173,213)'
                },
                {
                  offset: 1,
                  color: 'rgba(52,152,219,0)'
                }
              ])
            },
          },
          {
            name: '上行',
            data: up,
            type: 'line',
            smooth: true,
            symbol: 'none',
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(231,76,60)'
              },
              {
                offset: 1,
                color: 'rgb(241,196,15)'
              }
            ]),
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(225,134,124)'
                },
                {
                  offset: 1,
                  color: 'rgba(231,76,60,0)'
                }
              ])
            },
          }
        ]
      }

      option && this.net.setOption(option)

    }
  },
  mounted() {
    this.meminfo({})
    this.cpuinfo({})
    this.diskinfo({})
  }
}




