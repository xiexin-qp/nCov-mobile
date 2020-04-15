<template>
  <div id="app" class="share"></div>
</template>

<script>
import wx from 'weixin-js-sdk'
import config from '@config'
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {}
  },
  mounted() {
    window.document.title = '教职工注册'
    var url = window.location.href
    if (url.indexOf('?') != -1) {
      let str = url.substr(1)
      let strs = str.split('=')
      this.getConfig(strs[1])
    }
  },
  methods: {
    getConfig(code) {
      const url = '/getTicket'
       axios.get(url,{
        params: {
          path: window.location.href
        }
      })
      .then((response) => {
        const res = response.data
        wx.config({
          // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
        })
        wx.error(function(res) {
          console.log('wxerr', res)
        })
        wx.ready(function() {
          wx.updateAppMessageShareData({
            title: '教职工注册', // 分享标题
            desc: '疫情防控教职工注册', // 分享描述
            link: `${config.host}/mobile-protal/register?schoolCode=${code}#/registerTeacher`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: `${config.host}/mobile-protal/ncov.png`, // 分享图标
            success: function() {
            }
          })
          wx.updateTimelineShareData({
            title: '教职工注册', // 分享标题
            link: `${config.host}/mobile-protal/register/schoolCode=${code}#/registerTeacher`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: `${config.host}/mobile-protal/ncov.png`, // 分享图标
            success: function() {
            }
          })
        })
      })
      .catch((error) => {
        console.log(error);//异常
      });
    }
  }
}
</script>

<style lang="less" scoped>
.share {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: url('./share.png') no-repeat;
  background-size: cover;
}
</style>
