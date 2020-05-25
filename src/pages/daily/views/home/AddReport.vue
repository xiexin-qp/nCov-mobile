<template>
  <div class="qui-page qui-flex-ver">
    <!-- <popup-box
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
    </popup-box> -->
    <div class="qui-fx-f1 qui-fx-ver">
      <select-data title="测量部位" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
      <div class="submit-form qui-fx-f1">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">姓名</div>
           <div class="submit-input qui-tx-r qui-fx-f1">{{ dataForm.userName }}</div>
        </div>
        <!-- <div class="submit-item qui-fx-ac qui-bd-b" v-else>
          <div class="tip">姓名</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="isShow = true">{{ dataForm.userName }}</div>
          <div class="rit-icon"></div>
        </div> -->
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
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ bodyParts }}</div>
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
            <van-checkbox-group v-model="dataForm.symptom" :max="1">
              <van-checkbox 
                style="margin-bottom: 10px" 
                v-for="item in symptomsList"
                :key="item.id"
                :name="item.symptomsCode"
              > 
                {{item.symptomsName}}
              </van-checkbox>
              <!-- <van-checkbox name="b">复选框 b</van-checkbox>
              <van-checkbox name="c">复选框 c</van-checkbox> -->
            </van-checkbox-group>
            <!-- <van-radio-group v-model="dataForm.symptoms">
              <van-radio 
                style="margin-bottom: 10px" 
                v-for="item in symptomsList"
                :key="item.id"
                :name="item.symptomsCode"
              >
               {{item.symptomsName}}
              </van-radio>
            </van-radio-group> -->
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
// import PopupBox from '@com/PopupBox'
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
    // PopupBox
  },
  computed: {},
  data() {
    return {
      // searchName: '',
      // isShow: false,
      detail: {},
      typeTag: false,
      typeList: [],
      role: 0,
      dataForm: {
        userName: '',
        temperature: '',
        symptom:  [],
        symptomsRemarks: '',
        bodyParts: '请选择测量部位'
      },
      studentList: [],
      studentTag: false,
      currentIndex: '',
      curVal: '',
      bodyParts: '请选择测量部位',
      symptomsList:[]
    }
  },
  // watch:{
  //   searchName (curVal) {
  //     this.searchUser.name = curVal
  //     this.userGet()
  //   }
  // },
  mounted() {
    if (store.userInfo.roleCode === 'JZ') {
      this.dataForm.userName = store.userInfo.studentName
    } else {
      this.dataForm.userName = store.userInfo.userName
    }
    this.bodyGet()
    this.symptomsGet()
  },
  methods: {
    async bodyGet(){
      const res = await actions.getBody()
      this.typeList = res.result.map(item=>{
        item.id = item.bodyPartsCode
        item.text = item.bodyPartsName
        return item
      })
    },
    async symptomsGet(){
      const res = await actions.getSymptoms()
      this.symptomsList = res.result
    },
   submitForm() {
      validateForm(yzForm, this.dataForm, () => {
        this.dataForm.reportPersonName = store.userInfo.userName
        this.dataForm.reportPersonCode = store.userInfo.userCode
        this.dataForm.mark01 = this.dataForm.mark01 ? '1' : '2'
        // this.dataForm.gradeCode = store.userInfo.gradeCode
        // this.dataForm.classCode = store.userInfo.clazzCode
        this.dataForm.schoolCode = store.userInfo.schoolCode
        this.dataForm.symptoms = this.dataForm.symptom.length > 0 ? this.dataForm.symptom[0] : ''
        if (store.userInfo.roleCode === 'JZ') {
          this.dataForm.userCode = store.userInfo.studentCode
        } else {
          this.dataForm.userCode = store.userInfo.userCode
        }
        actions.addReport(this.dataForm).then(() => {
          this.$toast.success({ message: '提交成功' })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          })
      })
    },
    chooseType(item) {
      this.bodyParts = item.text
      this.dataForm.bodyParts = item.id
    },
    // chooseStudent(record, index){
    //   this.chooseItem = record
    //   this.currentIndex = index
    // },
    // choose(){
    //   this.dataForm.userName = this.chooseItem.studentName
    //   this.isShow = false
    // }
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
