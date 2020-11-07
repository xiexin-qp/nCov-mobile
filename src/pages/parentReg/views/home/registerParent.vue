<template>
  <div class="u-page u-fx-ver">
    <select-data title="身份类型" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
    <van-popup v-model="isMore" :close-on-click-overlay="false" :style="{ width: '80%', height: 'auto' }">
      <div class="dialog-more u-fx-ver">
        <div class="dialog-bg"></div>
        <div class="u-padd-20">请确认您要绑定的学生是：</div>
        <div class="u-fx-f1">
          <div
            @click="checkChild(index)"
            v-for="(child, index) in childList"
            :key="index"
            class="u-fx-ac u-padd-30 u-content-color"
          >
            <div :class="['check u-mar-l10 u-mar-r40', { act: currentIndex === index }]"></div>
            <div class>
              <img :src="child.photoUrl" alt />
            </div>
            <div class="u-fx-f1 u-mar-l40">{{ child.userName }}</div>
            <div>{{ child.workNo }}</div>
          </div>
        </div>
        <div class="u-fx-ac u-bd-t u-mar-t20">
          <div class="u-fx-f1 u-fx-ac-jc dialog-btn u-content-color u-bd-r" @click="isMore = false">取消</div>
          <div class="u-fx-f1 u-fx-ac-jc dialog-btn u-type-primary" @click="chooseChild">确定</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="isError" :style="{ width: '100%', height: '100%' }">
      <div class="error-bg"></div>
      <div class="error-btn">邀请链接已失效</div>
    </van-popup>
    <van-popup v-model="isOk" :close-on-click-overlay="false" :style="{ width: '100%', height: '100%' }">
      <div class="reg-ok">
        <div class="u-fx-ac u-fx-jc u-padd-t40">
          <div class="reg-title">
            <img style="width: 48px; height: 48px; display: block" :src="successImg" alt />
          </div>
          <div class="u-type-white u-font-3 u-mar-l40">注册成功</div>
        </div>
        <div class="reg-ewm">
          <img style="width: 100%; height: 100%; display: block" :src="wxImg" alt />
        </div>
      </div>
      <div class="u-fx-ver ewm-info u-tx-c">
        <p>如果您还没有关注我们的微信公众号</p>
        <p>请长按二维码关注我们</p>
      </div>
    </van-popup>
    <div class>
      <div class="header">
        <div class="header-box u-border-radius-big u-fx">
          <div class="u-type-white-bg u-fx-f1 u-fx-ac u-mar-l30 u-mar-r30 u-border-radius-big">
            <div class="u-mar-l40 u-mar-r30">
              <img :src="logoUrl" alt class="school-img" />
            </div>
            <div class>
              <div class="u-font-3 u-bold u-te">{{ schoolName }}</div>
              <div class="u-font-1 u-mar-t30 u-bold">{{ className }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="u-border-radius u-shadow submit-form u-padd u-type-white-bg u-mar-30">
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="icon-xm"></div>
          <div class="submit-input u-fx-f1">
            <input class="input u-tips-color" v-model="dataForm.userName" type="text" placeholder="孩子姓名" />
          </div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="icon-gx"></div>
          <div class="submit-input u-fx-f1" @click="typeTag = true">
            <input
              class="input u-tips-color"
              v-model="dataForm.relationShipText"
              type="text"
              readonly
              placeholder="亲属关系"
            />
          </div>
          <div class="icon-down"></div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="icon-jz"></div>
          <div class="submit-input u-fx-f1">
            <input class="input u-tips-color" v-model="dataForm.parentName" type="text" placeholder="家长姓名" />
          </div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="icon-phone"></div>
          <div class="submit-input u-fx-f1">
            <input class="input u-tips-color" v-model="dataForm.mobile" type="tel" placeholder="手机号" />
          </div>
        </div>
        <div class="submit-item u-fx-ac">
          <div class="icon-yzm"></div>
          <div class="submit-input u-fx-f1">
            <input class="input u-tips-color" v-model="dataForm.captchaCode" type="text" placeholder="验证码" />
          </div>
          <div class="u-type-primary" @click="getCode">{{ total === 60 ? '获取验证码' : total + 'S' }}</div>
        </div>
      </div>
      <div class="submit-bottom">
        <div class="submit-btn" @click="submitForm">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import successImg from '../../images/success.png'
import wxTest from '@a/img/wx_ewm_test.jpg'
import wxProd from '@a/img/wx_ewm_prod.jpg'
import validateForm from '@u/validate'
import SelectData from '@c/common/SelectData'
import { actions } from '../../store/index'
const ConfigEnv = process.env.VUE_APP_URL
const yzForm = {
  userName: '请输入姓名',
  relationShip: '请选择家属类型',
  parentName: '请输入家长姓名',
  mobile: '请输入家长手机号',
  captchaCode: '请输入验证码',
}
export default {
  name: 'RegisterParent',
  components: {
    SelectData,
  },
  computed: {},
  beforeCreate() {
    window.document.title = '家长注册'
  },
  data() {
    return {
      successImg,
      currentIndex: 0,
      isError: false,
      isMore: false,
      isOk: false,
      typeTag: false,
      typeList: [
        {
          id: 1,
          text: '爸爸',
        },
        {
          id: 2,
          text: '妈妈',
        },
        {
          id: 3,
          text: '爷爷',
        },
        {
          id: 4,
          text: '奶奶',
        },
        {
          id: 5,
          text: '其他',
        },
      ],
      total: 60,
      childList: [],
      wxImg: ConfigEnv === 'prod' ? wxProd : wxTest,
      schoolName: '',
      className: '',
      logoUrl: '',
      dataForm: {
        userName: '',
        relationShipText: '',
        relationShip: '',
        workNo: '',
        parentName: '',
        mobile: '',
        schoolCode: '',
        gradeCode: '',
        classCode: '',
        yzmCode: '',
        captchaCode: '',
      },
    }
  },
  async mounted() {
    const url = window.location.href
    const params = new URLSearchParams(url.substr(url.indexOf('?')).replace('#/', ''))
    this.dateTime = params.get('date') || new Date().getTime()
    if (new Date().getTime() - this.dateTime > 1000 * 60 * 5) {
      this.isError = true
      return
    }
    this.isGX = params.get('isHighSchool') === '1'
    if (this.isGX) {
      this.subjectCode = params.get('subjectCode')
    }
    this.schoolCode = params.get('schoolCode') || 'CANPOINTAI'
    this.gradeCode = params.get('gradeCode')
    this.classCode = params.get('classCode')
    this.className = decodeURI(params.get('className'))
    const sRes = await actions.getSchoolInfo(this.schoolCode)
    this.logoUrl = sRes.data.logoUrl
    this.schoolName = sRes.data.schoolName
    // 处理界面错位问题
    document.body.addEventListener('focusin', () => {
      this.isReset = false
    })
    document.body.addEventListener('focusout', () => {
      this.isReset = true
      setTimeout(() => {
        if (this.isReset) {
          window.scrollTo(0, 0)
        }
      }, 200)
    })
  },
  methods: {
    async getCode() {
      if (!this.dataForm.mobile || !/^1[3456789]\d{9}$/.test(this.dataForm.mobile)) {
        this.$toast('请输入正确手机号')
        return
      }
      if (this.total != 60) return
      try {
        await actions.getCode(this.dataForm.mobile)
        this.$toast('获取成功')
        this.timer = setInterval(() => {
          this.total--
          if (this.total <= 0) {
            this.total = 60
            clearInterval(this.timer)
          }
        }, 1000)
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    checkChild(index) {
      this.currentIndex = index
    },
    submitForm() {
      validateForm(yzForm, this.dataForm, async () => {
        if (!/^1[3456789]\d{9}$/.test(this.dataForm.mobile)) {
          this.$toast('请输入正确手机号')
          return
        }
        if (this.isGX) {
           const cInfo = await actions.getChildInfo({
            page: 1,
            size: 5,
            schoolCode: this.schoolCode,
            schoolYearId: this.gradeCode,
            classId: this.classCode,
            keyword: this.dataForm.userName,
            hasDorm: '',
            hasPhoto: '',
          })
        if (cInfo.data.list.length === 0) {
          this.$toast('输入的孩子姓名有误')
          return
        } else if (cInfo.data.list.length > 0) {
          this.childList = cInfo.data.list
          this.dataForm.workNo = cInfo.data.list[0].workNo
          if (cInfo.data.list.length === 1) {
            this.sendQeq()
          } else {
            this.isMore = true
          }
        }
        } else {
          const cInfo = await actions.getChildInfo({
            page: 1,
            size: 5,
            schoolCode: this.schoolCode,
            schoolYearId: this.schoolYearId,
            gradeId: this.gradeCode,
            classId: this.classCode,
            keyword: this.dataForm.userName,
            hasDorm: '',
            hasPhoto: '',
          })
          if (cInfo.data.list.length === 0) {
            this.$toast('输入的孩子姓名有误')
            return
          } else if (cInfo.data.list.length > 0) {
            this.childList = cInfo.data.list
            this.dataForm.workNo = cInfo.data.list[0].workNo
            if (cInfo.data.list.length === 1) {
              this.sendQeq()
            } else {
              this.isMore = true
            }
          }
        }
      })
    },
    async sendQeq() {
      const req = {
        classCode: this.classCode,
        gradeCode: this.gradeCode,
        openid: '',
        photoUrl: '',
        schoolCode: this.schoolCode,
        userName: this.dataForm.userName,
        workNo: this.dataForm.workNo,
        relationShip: this.relationShip,
        parentName: this.dataForm.parentName,
        mobile: this.dataForm.mobile,
        captchaCode: this.dataForm.captchaCode,
      }
      if (this.isGX) {
        req.subjectCode = this.subjectCode
      }
      try {
        await actions.parRegister(req)
        this.isOk = true
      } catch (err) {
        this.$toast(err.message || '注册失败')
      }
    },
    chooseType(item) {
      this.dataForm.relationShip = item.id
      this.dataForm.relationShipText = item.text
    },
    chooseChild() {
      this.isMore = false
      this.dataForm.workNo = this.childList[this.currentIndex].workNo
      this.sendQeq()
    },
  },
}
</script>
<style lang="less" scoped>
.dialog-more {
  .check {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: block;
    background-color: @u-light-color;
    &.act {
      background-color: @u-type-primary;
    }
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    display: block;
  }
  .dialog-bg {
    height: 240px;
    background: @u-type-primary url('../../images/dialog-bg.png') no-repeat;
    background-size: 100% 240px;
  }
  .dialog-btn {
    height: 100px;
  }
}
.school-img {
  width: 120px;
  height: 120px;
  display: block;
  background-color: #f5f5f5;
}
.reg-ok {
  position: relative;
  height: 320px;
  background-color: @u-type-primary;
  .reg-ewm {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 50%;
    margin-left: -150px;
    top: 180px;
    z-index: 9;
  }
}
.ewm-info {
  color: @u-content-color;
  padding: 170px 20px 0 20px;
  line-height: 44px;
}
.error-bg {
  margin-top: 190px;
  width: 100%;
  height: 334px;
  background: url('../../images/error.png') no-repeat center;
  background-size: auto 334px;
}
.error-btn {
  width: 340px;
  height: 80px;
  background-color: @u-type-primary;
  color: @u-type-white;
  line-height: 80px;
  margin: 108px auto;
  border-radius: 80px;
  text-align: center;
}
.header {
  height: 312px;
  background: url('../../images/bg.png') no-repeat;
  background-size: 100% 312px;
  position: relative;
  margin-bottom: 80px;
  .header-box {
    width: 100%;
    position: absolute;
    height: 240px;
    top: 100px;
    z-index: 9;
    img {
      width: 150px;
      height: 150px;
      display: block;
    }
  }
}
.submit-form {
  .icon-xm {
    width: 30px;
    height: 27px;
    background: url('../../images/icon_xuesheng.png') no-repeat;
    background-size: 30px 27px;
  }
  .icon-gx {
    width: 30px;
    height: 32px;
    background: url('../../images/icon_guanxi.png') no-repeat;
    background-size: 30px 32px;
  }
  .icon-jz {
    width: 30px;
    height: 35px;
    background: url('../../images/icon_name.png') no-repeat;
    background-size: 30px 35px;
  }
  .icon-phone {
    width: 30px;
    height: 38px;
    background: url('../../images/icon_phone.png') no-repeat;
    background-size: 30px 38px;
  }
  .icon-yzm {
    width: 30px;
    height: 34px;
    background: url('../../images/icon_yanzhengma.png') no-repeat;
    background-size: 30px 34px;
  }
  .icon-down {
    width: 12px;
    height: 22px;
    background: url('../../images/icon_you.png') no-repeat;
    background-size: 12px 22px;
  }
  .submit-item {
    background-color: #fff;
    height: 110px;
    padding: 0px 25px 0px 40px;
    .submit-input {
      color: @u-content-color;
      margin-left: 30px;
      .input {
        color: @u-tips-color;
        width: 100%;
        border: none;
        height: 66px;
        line-height: 66px;
      }
    }
  }
}
.submit-bottom {
  padding: 45px @u-mp-30;
}
.submit-btn {
  height: 80px;
  line-height: 80px;
  border-radius: 8px;
  color: #fff;
  background-color: @u-type-primary;
  text-align: center;
}
</style>
