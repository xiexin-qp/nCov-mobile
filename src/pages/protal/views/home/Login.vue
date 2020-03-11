<template>
  <div class="login qui-page qui-fx-ver">
    <div class="logo">
      <div class="welcome">疫情防控系统</div>
      <img :src="logo" alt />
    </div>
    <div class="login-input qui-bd-b qui-fx-ac">
      <input class="qui-fx-f1" v-model="loginForm.phone" type="tel" placeholder="请输入手机号" />
      <span @click="getYzm" class="yzm-btn">{{ tip }}</span>
    </div>
    <div class="login-input qui-bd-b">
      <input type="tel" v-model="loginForm.code" placeholder="请输入验证码" />
    </div>
    <div class="login-btn" @click="login">登录</div>
  </div>
</template>

<script>
import { setStore, actions } from '../../store/index.js'
import logo from '@a/img/logo.png'
import $ajax from '@u/ajax-serve'
export default {
  name: 'Login',
  components: {},
  computed: {},
  data() {
    return { logo, tip: '获取验证码', loginForm: { phone: '', code: '666666' } }
  },
  async mounted() {},
  methods: {
    getYzm() {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.loginForm.phone) || this.loginForm.phone === '') {
        this.$notify('请输入正确的手机号码')
        return false
      }
      if (this.timer) return
      this.$notify('验证码已发送', 11111110)
      let total = 60
      this.timer = setInterval(() => {
        total--
        this.tip = `${total} s`
        if (total === 0) {
          this.tip = '获取验证码'
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    },
    async login() {
      if (this.loginForm.phone === '' || this.loginForm.code === '') {
        this.$notify('请输入手机号或验证码')
        return
      }
      const res = await actions.login({
        ...this.loginForm
      })
      if (res.length === 0) {
        this.$notify('你手机号尚未绑定注册')
        return
      }
      setStore({
        key: 'userInfo',
        data: res.data[0]
      })
      this.$router.push('/home')
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
