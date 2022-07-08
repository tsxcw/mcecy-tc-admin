<template>
  <div>
    <el-input v-model.number="num" clearable>
      <template slot="append">
        {{ unit }}
      </template>
    </el-input>
  </div>
</template>

<script>

export default {
  name: 'unit',
  props: ['value', 'unit'],
  data() {
    return {
      num: 0,
      unitnum: 0
    }
  },
  mounted() {
    if (this.unit === 'GB') {
      this.unitnum = 1000 * 1000
    }
    if (this.unit === 'MB') {
      this.unitnum = 1000
    }
  },
  watch: {
    value: function(e) {
      const num = (e / this.unitnum)
      if (num === this.num) {
        return false
      }
      if (num <= 0) {
        this.num = 0
      } else {
        this.num = num
      }
    },
    num(e) {
      if (e < 0) {
        e = 0
      }
      this.$emit('input', (e * this.unitnum))
    }
  }
}
</script>

<style scoped>

</style>
