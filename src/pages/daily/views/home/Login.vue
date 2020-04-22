<template>
  <div class="login qui-fx-ver">
    <div class="logo">
      <div class="welcome">疫情防控系统</div>
      <img :src="logo" alt />
    </div>
    <div class="login-input qui-bd-b qui-fx-ac">
      <input class="qui-fx-f1" v-model="loginForm.phone" type="tel" placeholder="请输入手机号" />
      <span @click="getYzm" :class="['yzm-btn', { act: total !== 60 }]">{{ tip }}</span>
    </div>
    <div class="login-input qui-bd-b">
      <input type="tel" v-model="loginForm.authCode" placeholder="请输入验证码" />
    </div>
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>

<script>
import { setStore, actions } from '../../store/index.js'
import axios from 'axios'
import logo from '@a/img/logo.png'
export default {
  name: 'Login',
  components: {},
  computed: {},
  data() {
    return { total: 60, logo, tip: '获取验证码', loginForm: { phone: '', authCode: '' } }
  },
  beforeRouteLeave(to, from, next) {
    this.total = 60
    clearInterval(this.timer)
    next()
  },
  mounted() {
    const url = window.location.href
    const params = new URLSearchParams(url.substr(url.indexOf('?')).replace('#/', ''))
    if (params.get('openid')) {
      this.setOpenid(params.get('openid'))
      return
    }
    const code = params.get('code')
    if (window.localStorage.getItem('openid')) {
      this.setOpenid(window.localStorage.getItem('openid'))
    } else {
      axios
        .get('/getOpenid', {
          params: {
            code
          }
        })
        .then(res => {
          const openid = res.data.data.openid
          window.localStorage.setItem('openid', openid)
          this.setOpenid(openid)
        })
    }
  },
  methods: {
    setOpenid(openid) {
      this.openid = openid
      setStore({
        key: 'openid',
        data: openid
      })
      this.getInfoByOpenid(openid)
    },
    getYzm() {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.loginForm.phone) || this.loginForm.phone === '') {
        this.$notify('请输入正确的手机号码')
        return false
      }
      if (this.timer) return
      actions
        .getYzm({
          phone: this.loginForm.phone,
          type: 2
        })
        .then(() => {
          this.$notify('验证码已发送')
          this.timer = setInterval(() => {
            this.total--
            this.tip = `${this.total} s`
            if (this.total === 0) {
              this.total = 60
              this.tip = '获取验证码'
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        })
    },
    async login() {
      if (this.loginForm.phone === '') {
        this.$notify('请输入手机号')
        return
      } else if (this.loginForm.authCode === '') {
        this.$notify('请输入验证码')
        return
      }
      if (this.loginForm.phone && this.loginForm.authCode) {
        await actions.login({
          ...this.loginForm,
          openid: this.openid
        })
        this.getInfoByOpenid(this.openid)
      }
    },
    async getInfoByOpenid(openid) {
      const res = await actions.getUserInfo(openid)
      if (res.result && res.result.userCode) {
        setStore({
          key: 'userInfo',
          data: res.result
        })
        this.$router.replace('/home')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #fff;
  .logo {
    margin: 0px 80px;
    position: relative;
    .welcome {
      position: absolute;
      z-index: 99;
      bottom: 20px;
      width: 100%;
      text-align: center;
      font-size: 24px;
      color: #666;
      letter-spacing: 2px;
    }
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
  .login-input {
    height: 88px;
    line-height: 88px;
    margin: 20px 80px 30px;
    input {
      border: none;
      height: 80px;
      line-height: 80px;
      text-indent: 20px;
      width: 100%;
    }
  }
  .yzm-btn {
    color: @main-color;
    &.act {
      color: #999;
    }
  }
  .login-btn {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #fff;
    letter-spacing: 8px;
    margin: 40px 80px;
    border-radius: @radius;
    background-color: @main-color;
  }
}
</style>
