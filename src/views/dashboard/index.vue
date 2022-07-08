<template>
  <div class="dashboard-container">
    <div class="dash-control">
      <div>
        <div id="cpu"></div>
        <div class="percent">
          <b>{{ cpu_info.percent }}%</b>
        </div>
        <span>{{ cpu_info.percent > 80 ? '运行繁忙' : '运行流畅' }}</span>
      </div>
      <div>
        <div id="mem"></div>
        <div class="percent">
          <b>{{ mem_info.percent }}%</b>
        </div>
        <span>{{ mem_info.used }}GB / {{ mem_info.total }}GB</span>
      </div>
      <div>
        <div id="disk"></div>
        <div class="percent">
          <b>{{ disk_info.percent }}%</b>
        </div>
        <span>{{ disk_info.used }}GB / {{ disk_info.total }}GB</span>
      </div>
      <div>
        <div id="network"></div>
        <div class="percent">
          <small>{{ sizeFormat(net_info.up) }}
            <hr style="margin: 2px"/>
            {{ sizeFormat(net_info.down) }}</small>
        </div>
        <span>上传{{ sizeFormat(net_info.up) }} / 下载{{ sizeFormat(net_info.down) }}</span>
      </div>
    </div>
    <div class="dashboard-text">
      <div id="net" style="margin-bottom: 30px"></div>
      <div id="main"></div>
    </div>
  </div>
</template>

<script>
import { database, diskbase } from '@/api/database'
import upcharts from '@/views/dashboard/upcharts'
import control from '@/views/dashboard/control'
import { sizeFormat } from '@/utils'

export default {
  name: 'Dashboard',
  data() {
    return {
      charts: null,
      cpu_info: {
        count: 0,
        percent: 0
      },
      disk_info: {
        free: 0,
        percent: 0,
        total: 0,
        used: 0
      },
      mem_info: {
        free: 0,
        percent: 0,
        total: 0,
        used: 0
      },
      net_info: {
        down: 0,
        up: 0
      },
      timer: null
    }
  },
  mixins: [upcharts, control],
  async mounted() {
    const { days = [], num = [] } = await database()
    await this.fetchData(days, num)
    await this.diskdatainfo()
  },
  methods: {
    async diskdatainfo() {
      const { data } = await diskbase()
      await this.fetch(data)
      this.timer = setTimeout(this.diskdatainfo, 2000)
    },
    sizeFormat: sizeFormat,
    async fetch(data_base) {
      const { cpu = {}, disk = {}, mem = {}, net = {}, netlist = [] } = data_base
      this.cpu_info = cpu
      this.disk_info = disk
      this.mem_info = mem
      this.net_info = net
      this.cpuinfo(cpu)
      this.diskinfo(disk)
      this.meminfo(mem)
      this.netinfo(netlist)
      this.networkinfo(net)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
#main, #net {
  width: 100%;
  height: 450px;
}

.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.dash-control {
  height: 300px;
  display: flex;
  justify-content: space-between;

  > div {
    position: relative;
    display: flex;
    flex-direction: column;

    &:hover {
      .percent {
        opacity: 0;
      }
    }

    > span {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }

  #cpu, #mem, #disk, #network {
    position: relative;
    flex-shrink: 0;
    width: 300px;
    height: 260px;
  }
}

.percent {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 130px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  transition: opacity 300ms;

  > b {
    font-size: 22px;
  }
}
</style>
