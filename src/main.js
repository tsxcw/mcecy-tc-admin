/*
 * @Author: your name
 * @Date: 2021-11-01 08:36:49
 * @LastEditTime: 2022-02-12 18:04:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/main.js
 */
import Vue from 'vue'
window.log = console.log
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import globalCom from './components/globalCom'
import '@/icons' // icon
import '@/permission' // permission control
// set ElementUI lang to EN
Vue.use(ElementUI)
Vue.use(globalCom);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
