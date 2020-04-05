<template>
  <div id="app" class="share">
    请点击微信网页右上角"..."按钮，然后分享给教职工进行绑定注册
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
      const url = 'http://ai2.canpoint.net:8090/getTicket'
      axios
        .get(url, {
          params: {
            path: window.location.href.split('#')[0],
          },
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
          wx.ready(function () {
            wx.updateAppMessageShareData({
              title: '教职工注册', // 分享标题
              desc: '疫情防控教职工注册', // 分享描述
              link: `http://ai2.canpoint.net/nCov/register/?schoolCode=${code}#/registerTeacher`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://ai2.canpoint.net/nCov/ncov.png', // 分享图标
              success: function () {},
            })
            wx.updateTimelineShareData({
              title: '教职工注册', // 分享标题
              link: `http://ai2.canpoint.net/nCov/register/?schoolCode=${code}#/registerTeacher`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'http://ai2.canpoint.net/nCov/ncov.png', // 分享图标
              success: function () {},
            })
          })
        })
    },
  },
}
</script>

<style lang="less" scoped>
.share {
  padding: 20px;
  color: #333;
}
</style>
