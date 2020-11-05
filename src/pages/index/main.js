import Vue from 'vue'
import App from './App.vue'
import '@a/css/u-base.less'
import '@u/rem.js'

const attachFastClick = require('fastclick')
attachFastClick.attach(document.body)

new Vue({
  render: h => h(App)
}).$mount('#app')
