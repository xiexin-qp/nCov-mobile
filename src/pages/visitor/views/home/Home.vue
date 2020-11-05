<template>
  <div class="home u-fx-ver">
    <date-time
      :min-date="minDate"
      :max-date="maxDate"
      type="datetime"
      v-model="timeTag"
      :date="dataForm.accessStartTime"
      @get-date="getDate"
    ></date-time>
    <select-data title="选择学校" :select-list="schoolList" v-model="schoolTag" @confirm="chooseSchool"></select-data>
    <select-data title="选择事由" :select-list="causeList" v-model="causeTag" @confirm="chooseCause"></select-data>
    <div class="u-fx-f1 u-fx-ver">
      <div class="submit-form u-fx-f1">
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">访客姓名：</div>
          <div class="submit-input u-fx-f1">
            <input class="input" v-model="dataForm.visitorName" maxlength="7" type="text" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">访客手机号：</div>
          <div class="submit-input u-fx-f1">
            <input class="input" v-model="dataForm.visitorMobile" type="number" placeholder="请输入访客手机号" />
          </div>
        </div>
        <div class="submit-area u-fx-ver u-bd-b">
          <div class="tip">访客照片：</div>
          <div class="upload-list u-fx-f1">
            <upload-file v-if="!isWx" isCompress isUser :maxNum="1" v-model="profilePhoto"></upload-file>
            <div v-if="isWx" @click="chooseImg" class="wx-img">
              <span v-if="profilePhoto.length === 0">+</span>
              <img v-if="profilePhoto.length > 0" class="wx-img" :src="profilePhoto[0].base64" alt />
            </div>
          </div>
          <div class="sub-title mar-b10">请上传1张本人正脸清晰照片用于来访识别。</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div>随行人数：</div>
          <div class="submit-input u-fx-f1">
            <input class="input" v-model="dataForm.togetherNum" type="number" placeholder="0" />
          </div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">被访人学校</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="querySchool">{{ dataForm.school }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">被访人姓名：</div>
          <div class="submit-input u-fx-f1">
            <input
              class="input"
              v-model="dataForm.respondentName"
              type="text"
              maxlength="7"
              placeholder="请输入被访人姓名"
            />
          </div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">被访人手机号：</div>
          <div class="submit-input u-fx-f1">
            <!--  <input class="input" v-model="dataForm.resMobile" type="number" placeholder="请输入被访人手机号" /> -->
            <van-field
              v-model="dataForm.resMobile"
              input-align="right"
              @blur="yzMobile"
              placeholder="请输入被访人手机号"
            />
          </div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">预计到达时间</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="timeTag = true">{{ dataForm.accessStartTime }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">来访事由</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="showCause">{{ dataForm.causeName }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="submit-bottom">
        <div class="submit-btn" @click="submitForm">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import axios from 'axios'
import qs from 'qs'
import vConsole from 'vconsole'
import DateTime from '@c/common/DateTime'
import validateForm from '@u/validate'
import { actions } from '../../store/index'
import SelectData from '@c/common/SelectData'
import UploadFile from '@c/common/UploadFile'
import moment from 'moment'
import hostEnv from '@config'
import { Dialog, Field } from 'vant'

import 'moment/locale/zh-cn'
const yzForm = {
  visitorName: '请输入访客姓名',
  visitorMobile: '请输入访客手机号',
  profilePhoto: '请上传访客照片',
  school: '请选择被访人学校',
  respondentName: '请输入被访人姓名',
  resMobile: '请输入被访人手机号',
  accessStartTime: '请选择预计到达时间',
  causeName: '请选择来访事由'
}
export default {
  name: 'Visitor',
  components: {
    SelectData,
    DateTime,
    UploadFile,
    [Field.name]: Field,
    [Dialog.name]: Dialog
  },
  computed: {},
  beforeCreate() {
    window.document.title = '访客预约'
  },
  data() {
    return {
      isWx: false,
      basePic: '',
      moment,
      minDate: new Date(),
      maxDate: new Date(2030, 1, 1),
      isOk: false,
      schoolTag: false,
      causeTag: false,
      timeTag: false,
      schoolList: [],
      causeList: [],
      dataForm: {
        school: '请选择',
        visitorName: '',
        visitorMobile: '',
        causeName: '请选择',
        accessStartTime: '请选择',
        togetherNum: '',
        respondentName: '',
        resMobile: '',
        schoolCode: '',
        causeId: '',
        openid: ''
      },
      profilePhoto: [],
      userCode: ''
    }
  },
  mounted() {
    var ua = navigator.userAgent.toLowerCase()
    var isWeixin = ua.indexOf('micromessenger') != -1
    if (isWeixin) {
      this.isWx = true
    }
    if (process.env.VUE_APP_URL !== 'prod') {
      new vConsole()
    }
    this.getConfig()
    this.getOpenid()
  },
  methods: {
    // 校验人脸
    async checkPhoto(base64) {
      let canvas = document.createElement('canvas')
      let img = new Image()
      img.src = base64
      img.onload = async () => {
        if (img.width > 800 || img.height > 800) {
          if (img.width > img.height) {
            canvas.width = parseInt(700 * (img.height / img.width))
          } else {
            canvas.width = parseInt(700 * (img.width / img.height))
          }
          canvas.height = 700
        }
        let drawer = canvas.getContext('2d')
        drawer.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
        let newBase = canvas.toDataURL('image/jpeg')
        try {
          const url = `${hostEnv.hpb_face}/facePhoto`
          let res = await axios.post(
            url,
            qs.stringify({
              userCode: Math.floor(Math.random() * 100000),
              file: newBase.split(',')[1]
            })
          )
          if (res.data.data.result) {
            this.profilePhoto = [
              {
                id: Math.floor(Math.random() * 1000),
                url: res.data.data.url,
                base64: newBase
              }
            ]
          } else {
            this.$dialog({
              title: '提示',
              message: '访客人脸照片不符合规范，请重新上传'
            }).then(() => {})
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    chooseImg() {
      let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      const _self = this
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          var localId = res.localIds[0]
          wx.getLocalImgData({
            localId: localId, // 图片的localID
            success: function(res) {
              let localData = res.localData // localData是图片的base64数据，可以用img标签显示
              if (!isiOS) {
                localData = 'data:image/jpeg;base64,' + localData
              }
              _self.checkPhoto(localData)
            }
          })
        }
      })
    },
    getConfig() {
      const url = '/getTicket'
      axios
        .get(url, {
          params: {
            path: window.location.href.split('#')[0]
          }
        })
        .then(response => {
          const res = response.data
          wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名
            jsApiList: ['chooseImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表
          })
          wx.ready = function() {
            console.log('ready ok')
          }
          wx.error(function(res) {
            console.log('wxerr', res)
          })
        })
        .catch(error => {
          console.log(error) //异常
        })
    },
    // 获取openid
    async getOpenid() {
      const url = window.location.href
      const params = new URLSearchParams(url.substr(url.indexOf('?')).replace('#/', ''))
      // 本地测试使用
      if (!params.get('openid') && !params.get('code')) {
        this.$toast('请在地址栏输入openid进行绑定')
        return
      }
      if (params.get('openid') && !params.get('code')) {
        this.dataForm.openid = params.get('openid')
        return
      }
      const code = params.get('code')
      const res = await axios.get('/getOpenid', {
        params: {
          code
        }
      })
      this.dataForm.openid = res.data.data.openid
    },
    async getCause() {
      this.causeList = []
      if (!this.dataForm.schoolCode) {
        this.$toast('请选择被访人学校')
        return
      }
      const req = {
        schoolCode: this.dataForm.schoolCode
      }
      const res = await actions.getCauseList(req)
      if (res.data.list.length === 0) {
        return
      }
      res.data.list.forEach(ele => {
        this.causeList.push({
          text: ele.causeName,
          value: ele.id
        })
      })
    },
    yzMobile() {
      if (!/^1[3456789]\d{9}$/.test(this.dataForm.resMobile)) {
        this.$toast('请输入正确手机号')
        return
      }
      if (!this.dataForm.schoolCode) {
        return
      }
      let yzreq = {
        mobile: this.dataForm.resMobile,
        schoolCode: this.dataForm.schoolCode
      }
      actions.verifUser(yzreq).then(res => {
        if (!res.data) {
          this.$toast('该被访人手机号不是该校教职工')
          return
        }
        this.userCode = res.data
      })
    },
    submitForm() {
      const base64 = this.profilePhoto.length > 0 ? this.profilePhoto[0].base64.split(',')[1] : ''
      validateForm(yzForm, this.dataForm, () => {
        if (
          !/^1[3456789]\d{9}$/.test(this.dataForm.visitorMobile) ||
          !/^1[3456789]\d{9}$/.test(this.dataForm.resMobile)
        ) {
          this.$toast('请输入正确手机号')
          return
        }
        if (!this.userCode) {
          this.$toast('该被访人手机号不是该校教职工')
          return
        }
        let req = {
          ...this.dataForm,
          visitorUrl: base64,
          respondentType: '1',
          type: '0',
          respondentCode: this.userCode
        }
        req.accessStartTime = this.dataForm.accessStartTime + ':00'
        actions.addInviteInfo(req).then(() => {
          Dialog({ message: '您的预约申请已经提交成功，正在审核中' })
          this.dataForm = {
            school: '请选择',
            visitorName: '',
            visitorMobile: '',
            causeName: '请选择',
            accessStartTime: '请选择',
            togetherNum: 0,
            respondentName: '',
            resMobile: '',
            schoolCode: '',
            causeId: ''
          }
          this.profilePhoto = []
        })
      })
    },
    // 学校
    querySchool() {
      this.schoolTag = true
      this.getSchool()
    },
    getSchool() {
      this.schoolList = []
      actions.getSchoolList().then(res => {
        if (res.data.list.length === 0) {
          return
        }
        res.data.list.forEach(ele => {
          this.schoolList.push({
            text: ele.schoolName,
            value: ele.schoolCode
          })
        })
      })
    },
    chooseSchool(item) {
      if (!item) return
      this.dataForm.school = item.text
      this.dataForm.schoolCode = item.value
      if (!this.dataForm.resMobile) {
        return
      }
      let yzreq = {
        mobile: this.dataForm.resMobile,
        schoolCode: this.dataForm.schoolCode
      }
      actions.verifUser(yzreq).then(res => {
        if (!res.data) {
          this.$toast('该被访人手机号不是该校教职工')
          return
        }
        this.userCode = res.data
      })
    },
    // 事由
    showCause() {
      this.causeTag = true
      this.getCause()
    },
    chooseCause(item) {
      if (!item) return
      this.dataForm.causeName = item.text
      this.dataForm.causeId = item.value
    },
    // 获取日期
    getDate(time) {
      console.log(time)
      this.dataForm.accessStartTime = moment(time).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>
<style lang="less" scoped>
.wx-img {
  width: 100px;
  height: 100px;
  display: block;
  line-height: 100px;
  text-align: center;
  background-color: #eee;
  span {
    font-size: 60px;
    color: #999;
  }
}
.ewm-title {
  text-align: center;
  font-size: 32px;
  padding: 20px 0 0;
  color: #666;
}
.sub-title {
  color: #999;
}
.ewm-info {
  color: #666;
  padding: 0 20px;
  text-indent: 60px;
  line-height: 38px;
}
.submit-form {
  .mar-t20 {
    margin-top: 20px;
  }
  .tip::before {
    position: absolute;
    content: '*';
    color: #ff0000;
    left: -20px;
    top: 4px;
    z-index: 99;
  }
  .submit-item {
    background-color: #fff;
    height: 95px;
    padding: 0px 25px 0px 40px;
    .submit-input {
      color: #666;
      margin-left: 30px;
      .input {
        text-align: right;
        width: 100%;
        border: none;
        height: 66px;
        line-height: 66px;
      }
    }
  }
  .submit-area {
    background-color: #fff;
    padding: 30px 25px 0px 40px;
    .text-area {
      margin-top: 20px;
      height: 120px;
      border: none;
      width: 100%;
      color: #666;
    }
  }
  .upload-list {
    padding: 20px 0;
  }
}
.home {
  .upload-list {
    padding: 20px 0;
  }
  .submit-bottom {
    background-color: #fff;
    padding: 25px 20px;
  }
  .submit-btn {
    height: 80px;
    line-height: 80px;
    border-radius: 8px;
    color: #fff;
    background-color: @u-type-primary;
    text-align: center;
  }
  .mar-b10 {
    margin-bottom: 20px;
  }
  /deep/ .van-cell {
    padding: 0;
  }
}
</style>
