<template>
  <div class="home qui-fx-ver">
    <popup-box :no-btn="false" v-model="isOk" width="70" height="55">
      <div slot="title" class="ewm-title">预约成功</div>
    </popup-box>
    <date-time
      :min-date="new Date()"
      :max-date="new Date(2030, 1, 1)"
      type="date-time"
      v-model="timeTag"
      @get-date="getDate"
    ></date-time>
    <grade-class
      :shcool-code="dataForm.schoolCode"
      v-if="classTag"
      v-model="classTag"
      @confirm="chooseClass"
    ></grade-class>
    <div class="qui-fx-f1 qui-fx-ver">
      <div class="submit-form qui-fx-f1">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">访客姓名：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.visitorName" type="text" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">访客手机号：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.visitorMobile" type="number" placeholder="请输入访客手机号" />
          </div>
        </div>
        <div class="submit-area qui-fx-ver qui-bd-b">
          <div class="tip">访客照片：</div>
          <div class="upload-list qui-fx-f1">
            <upload-file :max-num="1" v-model="profilePhoto"></upload-file>
          </div>
          <div class="sub-title mar-b10">请上传1张本人正脸清晰照片用于来访识别。</div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">随行人数：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.togetherNum" type="number" placeholder="0" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">被访人学校</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="schoolTag = true">
            {{ dataForm.school }}
          </div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">被访人姓名：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.respondentName" type="text" placeholder="请输入被访人姓名" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">被访人手机号：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.resMobile" type="number" placeholder="请输入被访人手机号" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">预计到达时间</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="showDate('startTime')">{{ dataForm.startTime }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">来访事由</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="causeTag = true">
            {{ dataForm.cause }}
          </div>
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
import wxTest from '@a/img/wx_ewm_prod.jpg'
import wxProd from '@a/img/wx_ewm_prod.jpg'
import UploadFile from '@c/common/UploadFile'
import DateTime from '@c/common/DateTime'
import validateForm from '@u/validate'
import GradeClass from '@c/common/GradeClass'
import { actions } from '../../store/index'
import PopupBox from '@c/common/PopupBox'
import { Radio } from 'vant'
const ConfigEnv = process.env.VUE_APP_URL
const yzForm = {
  stuName: '请输入姓名',
  gender: '1',
  gradeCode: '请选择年级',
  clazzCode: '请选择班级',
  birthday: '请选择出生日期',
  parName: '请输入家长姓名',
  parphone: '请输入家长手机号',
}
export default {
  name: 'RegisterParent',
  components: {
    [Radio.name]: Radio,
    UploadFile,
    DateTime,
    GradeClass,
    PopupBox,
  },
  computed: {},
  beforeCreate() {
    window.document.title = '家长注册'
  },
  data() {
    return {
      wxImg: ConfigEnv === 'prod' ? wxProd : wxTest,
      isOk: false,
      timeTag: false,
      classTag: false,
      dataForm: {
        stuName: '',
        gender: '1',
        gradeCode: '',
        gradeName: '请选择',
        clazzCode: '',
        clazzName: '',
        userNo: '',
        birthday: '请选择',
        parName: '',
        parphone: '',
        schoolCode: '',
      },
      profilePhoto: [],
    }
  },
  mounted() {
    var url = window.location.href
    const paramsArr = url.substring(url.indexOf('?') + 1, url.indexOf('#/')).split('&')
    const paramsObj = {}
    paramsArr.forEach((item) => {
      let arr = item.split('=')
      paramsObj[arr[0]] = arr[1]
    })
    this.dataForm.schoolCode = paramsObj.schoolCode
  },
  methods: {
    submitForm() {
      const base64 = this.profilePhoto.length > 0 ? this.profilePhoto[0].url.split(',')[1] : ''
      validateForm(yzForm, this.dataForm, () => {
        if (!/^1[3456789]\d{9}$/.test(this.dataForm.parphone)) {
          this.$toast('请输入正确手机号')
          return
        }
        actions.parRegister({ ...this.dataForm, profilePhoto: base64 }).then(() => {
          this.isOk = true
        })
      })
    },
    // 班级
    chooseClass(item) {
      if (item.gradeName === '') return
      this.dataForm = Object.assign(this.dataForm, item)
    },
    // 展示日期框
    showDate(type) {
      this.timeTag = true
      this.timeType = type
    },
    // 获取日期
    getDate(time) {
      this.timeTag = false
      this.dataForm[this.timeType] = time
    },
  },
}
</script>
<style lang="less" scoped>
.wx-img {
  width: 300px;
  height: 300px;
  display: block;
  margin: 20px auto;
}
.ewm-title {
  text-align: center;
  font-size: 32px;
  padding: 20px 0 0;
  color: #666;
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
    background-color: @main-color;
    text-align: center;
  }
  .mar-b10{
    margin-bottom: 20px;
  }
}
</style>
