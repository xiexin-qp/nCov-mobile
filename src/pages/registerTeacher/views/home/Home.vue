<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="教职工注册"></header-com>
 <div class="qui-fx-f1 qui-fx-ver">
    <date-time v-model="timeTag" @get-date="getDate"></date-time>
    <div class="submit-form qui-fx-f1">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">姓名</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.name" type="text" placeholder="请输入姓名" />
        </div>
      </div>
         <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">手机号</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.telphone" type="text" placeholder="请输入手机号" />
        </div>
      </div>
           <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">工号</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.number" type="text" placeholder="请输入工号" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">职位</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.position">
            <van-radio name="1">班主任</van-radio>
            <van-radio name="2" style="margin-left: 15px">教职工</van-radio>
          </van-radio-group>
        </div>
      </div>
         <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">性别</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.sex">
            <van-radio name="1">男</van-radio>
            <van-radio name="2" style="margin-left: 15px">女</van-radio>
          </van-radio-group>
        </div>
      </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">出生日期</div>
          <div
            class="submit-input qui-tx-r qui-fx-f1"
            @click="showDate('birthday')"
          >{{ dataForm.birthday }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-area qui-fx-ver">
          <div class="tip">人脸照片</div>
          <div class="upload-list qui-fx-f1">
            <upload-file v-model="dataForm.fileList"></upload-file>
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
import HeaderCom from '@com/HeaderCom'
import { store, actions } from '../../store'
import UploadFile from '@c/common/UploadFile'
import DateTime from '@c/common/DateTime'
import validateForm from '@u/validate'
import { Radio} from 'vant'
const yzForm = {
  name: '请输入姓名',
  telphone: '请输入手机号',
  number: '请输入工号',
   birthday: '请选择时间',
}
export default {
  name: 'Home',
  components: {
    HeaderCom,
    [Radio.name]: Radio,
    UploadFile,
    DateTime
  },
  props: {},
  computed: {},
  data() {
    return {
      timeTag: false,
      dataForm: {
        name: '',
        telphone: '',
        number: '',
        position: '1',
        sex: '1',
        fileList: [],
        birthday: '请选择',
      }
    }
  },
  methods: {
    submitForm() {
      validateForm(yzForm, this.dataForm, () => {})
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
    }
  }
}
</script>
<style lang="less" scoped>
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
.home{
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
