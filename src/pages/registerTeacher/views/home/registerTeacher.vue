<template>
  <div class="home qui-page qui-fx-ver">
    <header-com title="教职工注册"></header-com>
 <div class="qui-fx-f1 qui-fx-ver">
     <select-data title="身份类型" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
      <select-data title="绑定班级" :select-list="classList" v-model="classTag" @confirm="chooseClass"></select-data>
    <date-time v-model="timeTag" @get-date="getDate"></date-time>
    <div class="submit-form qui-fx-f1">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">姓名</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.name" type="text" placeholder="请输入姓名" />
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
        <div class="tip">手机号</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.telphone" type="text" placeholder="请输入手机号" />
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
           <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">工号</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.number" type="text" placeholder="请输入工号" />
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">职位</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
       <div class="submit-item qui-fx-ac qui-bd-b" v-if="classShow">
        <div class="tip">绑定班级</div>
        <div class="submit-input qui-tx-r qui-fx-f1" @click="classTag = true">{{ dataForm.className }}</div>
        <div class="rit-icon"></div>
      </div>
       <div class="submit-item qui-fx-ac qui-bd-b"  v-if="classShow">
          <div class>班级人数</div>
          <div class="submit-input qui-tx-r qui-fx-f1">{{ dataForm.classSize }}</div>
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
import SelectData from '@c/common/SelectData'
import { RadioGroup, Radio} from 'vant'
const yzForm = {
        name: '请输入姓名',
        telphone: '请输入手机号',
       birthday: '请选择出生日期',
        type: '请选择职务类型',
        className: '请选择班级',
        sex: '1',
}
export default {
  name: 'RegisterTeacher',
  components: {
    [Radio.name]: Radio,
    HeaderCom,
    UploadFile,
    DateTime,
  SelectData
  },
  props: {},
  computed: {},
  data() {
    return {
      typeTag: false,
      timeTag: false,
      classTag: false,
      classShow:false,
        typeList: [
        {
          id: 1,
          text: '班主任'
        },
        {
          id: 2,
          text: '教职工'
        }
      ],
      classList:[
        {
          id: 1,
          text: '高一（1）班',
          num: 23
        },
        {
          id: 2,
          text: '高一（2）班',
          num: 33
        },
        {
          id: 3,
          text: '高一（3）班',
          num: 56
        }
      ],
      dataForm: {
        name: '',
        sex: '1',
        telphone: '',
        birthday: '请选择',
        number: '',
        type: '请选择',
        className: '请选择',
        classSize:'',
        fileList: [],

      }
    }
  },
  methods: {
    submitForm() {
      validateForm(yzForm, this.dataForm, () => {})
    }, 
        // 选择身份
    chooseType(item) {
      this.dataForm.type = item.text
      if(item.text=="班主任"){
        this.classShow = true
      }else{
        this.classShow = false

      }
    },
      // 班级
    chooseClass(item) {
      this.dataForm.className = item.text
      this.dataForm.classSize = item.num
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
