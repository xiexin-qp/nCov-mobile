<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {}
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      const url = '/getTicket'
        axios.get(url,{
          params: {
            path: window.location.href.split('#')[0]
          }
        })
        .then((data) => {
          const res = data.data
          wx.config({
           // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
          })
          wx.error(function (res) {
            console.log('wxerr', res)
          })
          wx.ready(() => {
          })
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
