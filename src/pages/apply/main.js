import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ajax from '@u/ajax-serve'
import tools from '@u/tools'
import '@u/filters.js'
import '@u/directives.js'
import '@u/rem.js'
import '@a/css/qui-base.css'
import '@a/css/global.less'
import '@a/js/vant-plugin.js'

import attachFastClick from 'fastclick'

const huang = require('./assets/huang@3x.png')
const lv = require('./assets/lv@3x.png')
const hong = require('./assets/hong@3x.png')

attachFastClick.attach(document.body)
/**
 * @description 处理fastClick导出文本输入框点击不灵敏bug
 */
attachFastClick.prototype.focus = function(targetElement) {
  let length
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf('date') !== 0 &&
    targetElement.type !== 'time' &&
    targetElement.type !== 'month'
  ) {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}

Vue.prototype.$ajax = $ajax
Vue.prototype.$tools = tools
Vue.prototype.$getStatus = function(status) {
  if (status == 1) {
    return [huang, '#F29100', 'rgba(242, 145,0, 0.15)', '申请中']
  }
  if (status == 2) {
    return [lv, '#00D277', 'rgba(0, 210, 119,0.15)', '申请成功']
  }
  return [hong, '#F34646', 'rgba(243, 70, 70,0.15)', '申请失败']
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
