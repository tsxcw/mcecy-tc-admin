/*
 * @Author: your name
 * @Date: 2021-11-03 10:11:39
 * @LastEditTime: 2022-01-06 13:43:37
 * @LastEditors: Please set LastEditors
 * @Description: 全局组建挂在的文件
 * @FilePath: /mcecy-admin/src/components/globalCom.js
 */
import paginate from "./pagintate";//分页组件

/**
 * @description: cdn图片尺寸参数生成
 * @param {*} size 图片宽度尺寸；高度等比例
 * @return {*} String
 */
const imageSize = (size) => {
  return `?imageMogr2/thumbnail/${size}x`
}
/**
 * @description: 将数字格式化为带单位的展示内容
 * @param {*} num 数字
 * @return {*} 字符串
 */
const numberFormat = (num) => {
  if (!num) {
    return 0;
  }
  if (Number(num) >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿';
  }
  if (Number(num) >= 10000) {
    return (num / 10000).toFixed(2) + '万';
  }

  return num;
}
/**
 * @description: 锁定页面滚动
 * @param {*} {status:true|false} true锁定｜false取消锁定
 * @return {*}
 */
const bodylock = (status) => {
  if (status) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
/**
 * @description: 动画执行函数 animate.css库
 * @param {*} event dom节点
 * @param {*} AnimateClassName animate的动画类名 无需animate__前缀
 * @param {*} time 动画时间 默认2秒
 * @return {*}
 */
// const animate = async (event, AnimateClassName, time = 2) => {
//   const dom = event.target.classList;
//   AnimateClassName = 'animate__' + AnimateClassName;
//   dom.add("animate__animated", AnimateClassName);
//   await Sleep(time * 1000);
//   dom.remove(AnimateClassName);
// }
export default {
  install(Vue) {
    //将全局组建放在此处
    Vue.prototype.imageSize = imageSize;
    Vue.component("page", paginate);
  },
};
