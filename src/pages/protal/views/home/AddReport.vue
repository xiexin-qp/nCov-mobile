<template>
  <div class="qui-page qui-flex-ver">
    <popup-box
      v-model="isShow"
      @confirm="choose"
      :cancel-text="'取消'"
      width="80"
      height="80"
    >
      <div slot="title" style="padding: 10px; text-align:center">
        <van-search v-model="searchName" placeholder="请输入姓名进行搜索" />
      </div>
      <div class="info-list">
        <div
          style="height: 2rem; line-height: 2rem; padding-left: 10px;"
          :class="['qui-bd-b',currentIndex === index ? 'active' : '']"
          v-for="(item,index) in studentList"
          :key="item.id"
          @click="chooseStudent(item,index)"
        >{{ item.studentName }}</div>
      </div>
    </popup-box>
    <div class="qui-fx-f1 qui-fx-ver">
      <select-data title="测量部位" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
      <div class="submit-form qui-fx-f1">
        <div class="submit-item qui-fx-ac qui-bd-b" v-if="role === 0">
          <div class="tip">姓名</div>
           <div class="submit-input qui-tx-r qui-fx-f1">{{ dataForm.userName }}</div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b" v-else>
          <div class="tip">姓名</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="isShow = true">{{ dataForm.userName }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">体温</div>
          <div class="submit-input qui-fx-f1">
            <input
              class="input"
              v-model="dataForm.temperature"
              type="text"
              placeholder="请输入测量值，正常值为36.2～37.3"
            />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">测量部位</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.bodyParts }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">是否接触疫情人员</div>
          <div class="submit-input qui-fx-f1 qui-fx-je">
            <van-switch v-model="dataForm.mark01" size="22px"/>
          </div>
        </div>
        <div class="submit-area qui-fx-ver">
          <div>附带症状</div>
          <div class="qui-fx-f1" style="padding: 10px 0 ">
            <van-radio-group v-model="dataForm.symptoms">
              <van-radio 
                style="margin-bottom: 10px" 
                v-for="item in symptomsList"
                :key="item.id"
                :name="item.symptomsCode"
              >
               {{item.symptomsName}}
              </van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="submit-area qui-fx-ver">
          <div>其他说明</div>
          <div class="qui-fx-f1">
            <textarea
              class="text-area"
              v-model="dataForm.symptomsRemarks"
              placeholder="1.其他不舒服症状，如呕吐、头晕等
  2.如有确诊、隔离、疑似症状，请详细说明情况"
            ></textarea>
          </div>
        </div>
        <div class="submit-bottom">
          <div class="submit-btn" @click="submitForm">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PopupBox from '@com/PopupBox'
import SelectData from '@c/common/SelectData'
import validateForm from '@u/validate'
import { RadioGroup, Radio, Switch, Checkbox, CheckboxGroup, Search } from 'vant'
import { store, actions } from '../../store'
const yzForm = {
  userName: '请选择学生',
  temperature: '请输入体温',
  bodyParts: '请选择测量部位'
}
export default {
  name: 'AddReport',
  components: {
    [Search.name]: Search,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Switch.name]: Switch,
    SelectData,
    PopupBox
  },
  computed: {},
  data() {
    return {
      searchName: '',
      isShow: false,
      detail: {},
      typeTag: false,
      typeList: [],
      role: 0,
      dataForm: {
        userName: '请选择学生',
        temperature: '',
        symptoms: [],
        symptomsRemarks: '',
        bodyParts: '请选择测量部位'
      },
      studentList: [],
      studentTag: false,
      currentIndex: '',
      curVal: '',
      bodyParts: '',
      searchList:{
        // name: '',
        pageSize:'20',
        pageNum:'1',
        schoolCode: '',
        clazzCode: '',
      },
      symptomsList:[],
      searchUser:{
        schoolCode: "QPZX",
        userType:"",
        page:1,
        size:10,
        userName:''
      }
    }
  },
  watch:{
    searchName (curVal) {
      this.searchUser.name = curVal
      this.userGet()
    }
  },
  mounted() {
    this.bodyGet()
    this.symptomsGet()
    // this.role = this.$route.query.type
    console.log(store.userInfo)
    if (this.role === 0) {
      this.dataForm.userName = store.userInfo.type === 2 ? store.userInfo.userName : store.userInfo.studentName
    } else  {
      // this.searchList.schoolCode = store.userInfo.schoolCode
      // this.searchList.clazzCode = store.userInfo.clazzCode
      this.searchList.schoolCode = 'QPZX'
      this.searchList.clazzCode = 'C14f0erz15ydb3'
      this.studentGet()
    }
  },
  methods: {
    async bodyGet(){
      const res = await actions.getBody()
      this.typeList = res.result.map(item=>{
        item.id = item.bodyPartsCode
        item.text = item.bodyPartsName
        return item
      })
      console.log('resres',this.typeList)
    },
    async symptomsGet(){
      const res = await actions.getSymptoms()
      this.symptomsList = res.result
    },
    async studentGet(){
      const res = await actions.teacherGetStudent(this.searchList)
      this.studentList = res.data
      console.log('resres',res.data)
    },
    async userGet(){
      const res = await actions.getUser(this.searchUser)
      this.studentList = res.data
      console.log('resres',res.data)
    },
   submitForm() {
      validateForm(yzForm, this.dataForm, () => {
        this.dataForm.bodyParts = this.bodyParts
        this.dataForm.reportPersonName = store.userInfo.userName
        this.dataForm.reportPersonCode = 'PR14f79wjmzihh9'
        // this.dataForm.reportPersonCode = store.userInfo.userCode
        // this.dataForm.userCode = store.userInfo.code
        this.dataForm.userCode = 'ST14f6u1b0wxwd7'
        this.dataForm.mark01 = this.dataForm.mark01 ? '1' : '2'
        this.dataForm.gradeCode = store.userInfo.schoolCode
        // this.dataForm.classCode = 'C14f0erz15ydb3'
        this.dataForm.classCode = store.userInfo.clazzCode
        // this.dataForm.schoolCode = 'CANPOINT'
        console.log('this.dataForm',this.dataForm)
        actions.addReport(this.dataForm).then(() => {
          this.$toast.success({ message: '提交成功' })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          })
      })
    },
    // submitForm() {
    //   validateForm(yzForm, this.dataForm, () => {
    //   // console.log('dataForm',this.dataForm.symptoms)
    //     if(this.dataForm.symptoms.length > 0) {
    //       this.dataForm.otherSymptom = this.dataForm.symptoms.map(item => {
    //         return {id:item.split('-')[0],name:item.split('-')[1]}
    //       })
    //     }
    //     if(
    //       (this.role === 0 && store.userInfo.type === 1) || 
    //       (this.role !== 0 && (store.userInfo.type === 2 || store.userInfo.type === 4))
    //     ) {
    //       this.dataForm.bodyParts = this.bodyParts
    //       this.dataForm.reportPersonName = store.userInfo.userName
    //       this.dataForm.phone = store.userInfo.phone
    //       this.dataForm.userCode = store.userInfo.code
    //       this.dataForm.reportType = '1'
    //       this.dataForm.mark01 = this.dataForm.mark01 ? '1' : '0'
    //       this.dataForm.studentName = store.userInfo.studentName
    //       this.dataForm.studentCode = store.userInfo.studentCode
    //       this.dataForm.studentNo = store.userInfo.studentNo
    //       this.dataForm.schoolCode = store.userInfo.schoolCode
    //       this.dataForm.gradeName = store.userInfo.gradeName
    //       this.dataForm.clazzCode = store.userInfo.clazzCode
    //       this.dataForm.className = store.userInfo.className
    //       this.dataForm.photoImg = store.userInfo.photoImg
    //       actions.studentReport(this.dataForm).then(() => {
    //         this.$toast.success({ message: '提交成功' })
    //         setTimeout(() => {
    //           this.$router.go(-1)
    //         }, 1000)
    //       })
    //     } else if(this.role === 0 && store.userInfo.type !== 1 ){
    //       this.dataForm.teacherName = store.userInfo.userName
    //       this.dataForm.teacherCode = store.userInfo.code
    //       this.dataForm.teacherNo = store.userInfo.teacherNo
    //       this.dataForm.bodyParts = this.bodyParts
    //       this.dataForm.mark01 = this.dataForm.mark01 ? '1' : '0'
    //       this.dataForm.reportPersonName = store.userInfo.userName
    //       this.dataForm.phone = store.userInfo.phone
    //       this.dataForm.userCode = store.userInfo.code
    //       this.dataForm.reportType = '2'
    //       this.dataForm.photoImg = store.userInfo.photoImg
    //       actions.teacherReport(this.dataForm).then(() => {
    //         this.$toast.success({ message: '提交成功' })
    //         setTimeout(() => {
    //           this.$router.go(-1)
    //         }, 1000)
    //       })
    //     }
    //   })
    //   // addReport
    // },
    chooseType(item) {
      console.log(item)
      this.bodyParts = item.id
      this.dataForm.bodyParts = item.text
    },
    chooseStudent(record, index){
      this.chooseItem = record
      this.currentIndex = index
    },
    choose(){
      this.dataForm.userName = this.chooseItem.studentName
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-search {
  padding: 0 !important;
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
    .rit-icon {
      width: 30px;
      height: 30px;
      background:url('../../assets/img/select.png') no-repeat;
      background-size: 100%;
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
.active{
  background-color: #7d88fc;
  color: #fff;
}
* { touch-action: pan-y; } 
</style>
