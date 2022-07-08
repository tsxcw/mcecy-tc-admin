<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { setting_list } from '@/api/settings'
import { memory } from 'jsb-util'

export default {
  name: 'App',
  data() {
    return {
      is_load: false
    }
  },
  async mounted() {
    this.$router.beforeEach(async(to, form, next) => {
      if (this.is_load) {
        next()
        return
      }
      setting_list().then(({ code, list }) => {
        if (code === 200) {
          list.map(ell => {
            if (ell.key == 'app_name' || ell.key == 'app_logo') {
              memory.set(ell.key, ell.value)
            }
          })
        }
        this.is_load = true
        next()
      })
    })
  }
}
</script>
