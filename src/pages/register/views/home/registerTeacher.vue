<template>
  <div class="home qui-fx-ver">
    <popup-box :no-btn="false" v-model="isOk" width="70" height="55">
      <div slot="title" class="ewm-title">注册成功</div>
      <div class="qui-fx-ver ewm-info">
        <img class="wx-img" :src="wxImg" alt />
        <p>
          请长按二维码关注"全品平安校园"微信公众号，在"疫情日报"中对自己的情况进行上报，登录的账号为您注册的手机号。
        </p>
        <p>您也可以在微信中搜索"全品平安校园"微信公众号关注进行操作。</p>
      </div>
    </popup-box>
    <select-data title="身份类型" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
    <date-time
      :min-date="new Date(1995, 1, 1)"
      :max-date="new Date(2017, 1, 1)"
      type="date"
      v-model="timeTag"
      @get-date="getDate"
    ></date-time>
    <grade-class :shcool-code="dataForm.schoolCode" v-if="classTag" v-model="classTag" @confirm="chooseClass"></grade-class>
    <div class="qui-fx-f1 qui-fx-ver">
      <div class="submit-form qui-fx-f1">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">姓名</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.userName" type="text" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">性别</div>
          <div class="submit-input qui-fx-f1 qui-fx-je">
            <van-radio-group class="qui-fx-ac" v-model="dataForm.gender">
              <van-radio name="1">男</van-radio>
              <van-radio name="2" style="margin-left: 15px;">女</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">手机号</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.phone" type="tel" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">出生日期</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="showDate('birthday')">{{ dataForm.birthday }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div>工号</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.userNo" type="text" placeholder="请输入工号，可不填" />
          </div>
        </div>
        <div class="mar-t20">
          <div class="submit-item qui-fx-ac qui-bd-b">
            <div class="tip">职位</div>
            <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">
              {{ dataForm.classChargeMarkText }}
            </div>
            <div class="rit-icon"></div>
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b" v-if="classShow">
          <div class="tip">选择班级</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="classTag = true">
            {{ dataForm.gradeName }}{{ dataForm.clazzName }}
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b" v-if="classShow">
          <div class="tip">班级人数</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.clazzUserSum" type="text" placeholder="请输入班级人数" />
          </div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-area qui-fx-ver">
          <div>人脸照片</div>
          <div class="upload-list qui-fx-f1">
            <upload-file :max-num="1" v-model="profilePhoto"></upload-file>
          </div>
        </div>
      </div>
      <div class="submit-bottom">
        <div class="submit-btn" @click="submitForm">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import wxProd from '@a/img/wx_ewm_prod.jpg'
import wxTest from '@a/img/wx_ewm_prod.jpg'
import GradeClass from '@c/common/GradeClass'
import { actions } from '../../store/index'
import PopupBox from '@c/common/PopupBox'
import UploadFile from '@c/common/UploadFile'
import DateTime from '@c/common/DateTime'
import validateForm from '@u/validate'
import SelectData from '@c/common/SelectData'
import { Radio } from 'vant'
const ConfigEnv = process.env.VUE_APP_URL
const yzForm = {
  userName: '请输入姓名',
  phone: '请输入手机号',
  birthday: '请选择出生日期',
  classChargeMarkText: '请选择职务类型',
  gender: '请选择性别',
}
export default {
  name: 'RegisterTeacher',
  components: {
    [Radio.name]: Radio,
    UploadFile,
    DateTime,
    SelectData,
    GradeClass,
    PopupBox,
  },
  props: {},
  computed: {},
  data() {
    return {
      wxImg: ConfigEnv === 'prod' ? wxProd : wxTest,
      classTag: false,
      isOk: false,
      typeTag: false,
      timeTag: false,
      classShow: false,
      selectList: [],
      dataForm: {
        userName: '',
        gender: '1',
        phone: '',
        birthday: '请选择',
        userNo: '',
        classChargeMarkText: '请选择',
        classChargeMark: '',
        clazzCode: '',
        clazzName: '',
        gradeCode: '',
        gradeName: '请选择',
        clazzUserSum: '45',
        schoolCode: '',
      },
      profilePhoto: [],
      typeList: [
        {
          id: 1,
          text: '班主任',
        },
        {
          id: 2,
          text: '教职工',
        },
      ],
    }
  },
  beforeCreate() {
    window.document.title = '教职工注册'
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
        if (!/^1[3456789]\d{9}$/.test(this.dataForm.phone)) {
          this.$toast('请输入正确手机号')
          return
        }
        if (this.dataForm.classChargeMark === 1) {
          if (!this.dataForm.clazzCode || !this.dataForm.gradeCode) {
            this.$toast('请选择年级班级')
            return
          }
        }
        delete this.dataForm.classChargeMarkText
        actions.teaRegister({ ...this.dataForm, profilePhoto: base64 }).then(() => {
          this.isOk = true
        })
      })
    },
    // 选择身份
    chooseType(item) {
      this.dataForm.classChargeMarkText = item.text
      this.dataForm.classChargeMark = item.id
      if (item.text === '班主任') {
        this.classShow = true
      } else {
        this.classShow = false
      }
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
}
</style>
