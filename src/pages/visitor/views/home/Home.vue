<template>
  <div class="home qui-fx-ver">
    <date-time
      :min-date="new Date()"
      :max-date="new Date(2030, 1, 1)"
      type="date-time"
      v-model="timeTag"
      @get-date="getDate"
    ></date-time>
    <select-data title="选择学校" :select-list="schoolList" v-model="schoolTag" @confirm="chooseSchool"></select-data>
    <select-data title="选择事由" :select-list="causeList" v-model="causeTag" @confirm="chooseCause"></select-data>
    <div class="qui-fx-f1 qui-fx-ver">
      <div class="submit-form qui-fx-f1">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">访客姓名：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.visitorName" maxLength="7" type="text" placeholder="请输入姓名" />
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
          <div>随行人数：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.togetherNum" type="number" placeholder="0" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">被访人学校</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="querySchool">
            {{ dataForm.school }}
          </div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">被访人姓名：</div>
          <div class="submit-input qui-fx-f1">
            <input class="input" v-model="dataForm.respondentName" type="text" maxLength="7" placeholder="请输入被访人姓名" />
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
          <div class="submit-input qui-tx-r qui-fx-f1" @click="showDate('accessStartTime')">{{ dataForm.accessStartTime }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">来访事由</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="showCause">
            {{ dataForm.causeName }}
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
import VConsole from 'vconsole/dist/vconsole.min.js'
import UploadFile from '@c/common/UploadFile'
import DateTime from '@c/common/DateTime'
import axios from 'axios'
import validateForm from '@u/validate'
import { actions } from '../../store/index'
import { Dialog } from 'vant'
import SelectData from '@c/common/SelectData'
import moment from 'moment'
import 'moment/locale/zh-cn'
const yzForm = {
  visitorName: '请输入访客姓名',
  visitorMobile: '请输入访客手机号',
  profilePhoto: '请上传访客照片',
  school: '请选择被访人学校',
  respondentName: '请输入被访人姓名',
  resMobile: '请输入被访人手机号',
  accessStartTime: '请选择预计到达时间',
  causeName: '请选择来访事由',
}
export default {
  name: 'Visitor',
  components: {
    SelectData,
    UploadFile,
    DateTime,
    [Dialog.name]: Dialog
  },
  computed: {},
  beforeCreate() {
    window.document.title = '访客预约'
  },
  data() {
    return {
      moment,
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
        causeId:'',
        openid: ''
      },
      profilePhoto: [],
    }
  },
  mounted() {
    var vConsole = new VConsole();
    const url = window.location.href
    const params = new URLSearchParams(url.substr(url.indexOf('?')).replace('#/', ''))
    if (params.get('openid')) {
      this.dataForm.openid = params.get('openid')
      return
    }
    const code = params.get('code')
    if (window.localStorage.getItem('openid')) {
      this.dataForm.openid = window.localStorage.getItem('openid')
    } else {
      axios
        .get('http://canpointtest.com/getOpenid', {
          params: {
            code
          }
        })
        .then(res => {
          const openid = res.data.data.openid
          window.localStorage.setItem('openid', openid)
          this.dataForm.openid = openid
        })
    }
  },
  methods: {
    async getCause() {
      this.causeList = []
			if (!this.dataForm.schoolCode) {
				this.$toast('请选择被访人学校')
				return;
      }
			const req = {
				schoolCode: this.dataForm.schoolCode
			};
			const res = await actions.getCauseList(req)
			if (res.data.list.length === 0) {
				return;
			}
			res.data.list.forEach(ele => {
				this.causeList.push({
					text: ele.causeName,
					value: ele.id
				});
      });
		},
    submitForm() {
      const base64 = this.profilePhoto.length > 0 ? this.profilePhoto[0].url.split(',')[1] : ''
      validateForm(yzForm, this.dataForm, () => {
        if (!/^1[3456789]\d{9}$/.test(this.dataForm.visitorMobile) || !/^1[3456789]\d{9}$/.test(this.dataForm.resMobile)) {
          this.$toast('请输入正确手机号')
          return
        }
        let yzreq = {
          mobile: this.dataForm.resMobile,
          schoolCode: this.dataForm.schoolCode 
        }
        actions.verifUser(yzreq).then((res) => {
          if(!res.data){
            this.$toast('该手机号不是该校教职工')
            return
          }
          let req = {
            ...this.dataForm, 
            visitorUrl: base64,
            respondentType: '1',
            type: '0',
            openid: this.dataForm.openid,
            respondentCode: res.data
          }
          req.accessStartTime =this.dataForm.accessStartTime + ':00'
          actions.addInviteInfo(req).then(() => {
            this.$toast.success('预约成功')
            this.dataForm={
              school: '请选择',
              visitorName: '',
              visitorMobile: '',
              causeName: '请选择',
              accessStartTime: '请选择',
              togetherNum: 0,
              respondentName: '',
              resMobile: '',
              schoolCode: '',
              causeId:'',
              openid: ''
            },
            this.profilePhoto = []
            Dialog({ message: '您的预约申请已经提交成功,正在审核中' })
          })
        })
      })
    },
    // 学校
    querySchool(){
      this.schoolTag = true
      this.getSchool()
    },
    getSchool(){
      this.schoolList = []
			actions.getSchoolList().then(res=>{
        if (res.data.list.length === 0) {
          return;
        }
        res.data.list.forEach(ele => {
          this.schoolList.push({
            text: ele.schoolName,
            value: ele.schoolCode
          });
        });
      })
    },
    chooseSchool(item) {
      if (!item) return
      this.dataForm.school = item.text
      this.dataForm.schoolCode = item.value
    },
    // 事由
    showCause(){
      this.causeTag= true
      this.getCause()
    },
    chooseCause(item) {
      if (!item) return
      this.dataForm.causeName = item.text
      this.dataForm.causeId = item.value
    },
    // 展示日期框
    showDate(type) {
      this.timeTag = true
      this.timeType = type
    },
    // 获取日期
    getDate(time) {
      this.timeTag = false
      this.dataForm[this.timeType] = moment(time).format('YYYY-MM-DD HH:mm')
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
.sub-title{
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
    background-color: @main-color;
    text-align: center;
  }
  .mar-b10{
    margin-bottom: 20px;
  }
}
</style>
