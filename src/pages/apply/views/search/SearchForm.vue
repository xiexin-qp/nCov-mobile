<template>
  <div class="login qui-fx-ver">
    <Header title="查看申请进度" />
    <div class="tip-title">请输入手机号及验证码进行查询</div>
    <div class="login-input qui-bd-b qui-fx-ac">
      <span class="title">手机号码</span>
      <input class="qui-fx-f1" v-model="loginForm.phone" type="tel" placeholder="请输入手机号" />
      <span @click="getYzm" :class="['yzm-btn', { act: total !== 60 }]">{{ tip }}</span>
    </div>
    <div class="login-input qui-bd-b">
      <span class="title">短信验证码</span>
      <input type="tel" v-model="loginForm.authCode" placeholder="请输入验证码" />
    </div>
    <div class="login-btn" @click="search">查询</div>
  </div>
</template>

<script>
import Header from '../../component/Header.vue'
import { actions } from '../../store/index'
import { Notify } from 'vant'
export default {
  name: 'Login',
  components: {
    Header,
  },
  computed: {},
  data() {
    return { total: 60, tip: '获取验证码', loginForm: { phone: '', authCode: '' } }
  },
  mounted() {},
  methods: {
    getYzm() {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.loginForm.phone) || this.loginForm.phone === '') {
        this.$notify('请输入正确的手机号码')
        return false
      }
      if (this.timer) return
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
      actions.getCode(this.loginForm.phone).then(() => {
        Notify({
          type: 'success',
          message: '验证码已发送',
        })
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
    search() {
      if (this.loginForm.authCode.trim().length === 0) {
        this.$notify('请输入验证码')
        return
      }
      const req = {
        mobile: this.loginForm.phone,
        code: this.loginForm.authCode,
      }
      actions.getApplyList(req).then((res) => {
        if (res && res.code === 200) {
          sessionStorage.setItem('applyList', JSON.stringify(res.data))
          this.$router.push({
            path: '/applyList',
          })
        } else {
          this.$notify(res.message || '查询失败')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  .tip-title {
    padding: 20px 0 20px 50px;
  }
  .login-input {
    display: flex;
    height: 88px;
    line-height: 88px;
    margin: 20px 50px 30px;
    .title {
      display: flex;
      width: 150px;
    }
    input {
      border: none;
      height: 80px;
      line-height: 80px;
      text-indent: 20px;
      width: 60%;
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
    margin: 40px 60px;
    border-radius: @radius;
    background-color: @main-color;
  }
}
</style>
