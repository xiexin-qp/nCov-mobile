<template>
  <div class="form-one qui-fx-f1 qui-fx-ver">
    <select-data
      title="政治面貌"
      :select-list="identityList"
      v-model="identityTag"
      @confirm="chooseIdentity"
    ></select-data>
    <select-panel title="选择民族" :select-list="nationList" v-model="nationTag" @confirm="chooseNation"></select-panel>
    <select-panel
      title="选择专业"
      :select-list="projectList"
      v-model="projectTag"
      @confirm="chooseProject"
    ></select-panel>
    <div class="form-title">欢迎报读{{ formTitle }}</div>
    <div class="submit-form qui-fx-f1 form-list">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">学生姓名</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.studentName" type="text" placeholder="请输入姓名" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">性别</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.studentSex">
            <van-radio name="0">男</van-radio>
            <van-radio name="1" style="margin-left: 15px">女</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">身份证号</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.studentIdCard" type="text" placeholder="请输入身份证号" />
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">民族</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="nationTag = true">{{ dataForm.studentNation }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">政治面貌</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="identityTag = true">{{ dataForm.identity }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">学生来源</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.source">
            <van-radio name="应届">应届</van-radio>
            <van-radio name="非应届" style="margin-left: 15px">非应届</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">毕业学校</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.lastSchool" type="text" placeholder="请输入毕业学校名称" />
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">申请专业</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="projectTag = true">
            {{ dataForm.applyProject || '请选择' }}
          </div>
          <div class="rit-icon"></div>
        </div>
      </div>
    </div>
    <div class="form-footer">
      <van-button
        @click="goNext"
        type="info"
        size="normal"
        style="width: 70%; border-radius: 8px"
        color="rgba(22, 155, 213, 1)"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script>
import validateForm from '@u/validate'
import SelectData from '@c/common/SelectData'
import SelectPanel from '../component/SelectPanel'
import { nation } from '@u/nation'
import { Radio } from 'vant'
import { actions } from '../store/index'
const yzForm = {
  studentName: '请输入学生姓名',
  studentIdCard: '请输入正确身份证号码',
  lastSchool: '请输入毕业学校',
  applyProject: '请选择专业',
}
export default {
  components: {
    [Radio.name]: Radio,
    SelectData,
    SelectPanel,
  },
  props: {
    dataForm: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      formTitle: '旬阳中等职业学校',
      identityTag: false,
      nationTag: false,
      projectTag: false,
      nationList: nation.map((item) => {
        return { id: item.id, text: item.name }
      }),
      identityList: [
        {
          id: 1,
          text: '群众',
        },
        {
          id: 2,
          text: '团员',
        },
        {
          id: 3,
          text: '党员',
        },
        {
          id: 4,
          text: '其他',
        },
      ],
      projectList: [],
    }
  },
  mounted() {
    this.getSubJect()
  },
  methods: {
    async getSubJect() {
      const gradeName = 2020
      const schoolCode = 'CANPOINTAI'
      const res = await actions.getSubjectList({ gradeName, schoolCode })
      if (res && res.code === 200) {
        this.projectList = res.data.map((item) => {
          return {
            id: item.subjectCode,
            text: item.subjectName,
          }
        })
      }
    },
    // 选择民族
    chooseNation(item) {
      this.dataForm.studentNation = item.text
    },
    // 选择政治面貌
    chooseIdentity(item) {
      this.dataForm.identity = item.text
    },
    // 选择专业
    chooseProject(item) {
      this.dataForm.subjectCode = item.id
      this.dataForm.applyProject = item.text
    },
    // 下一步
    goNext() {
      validateForm(yzForm, this.dataForm, () => {
        const idCardReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

        if (this.dataForm.studentName.trim().length > 20) {
          this.$toast('学生姓名限制20个字符')
          return
        }
        if (this.dataForm.lastSchool.trim().length > 20) {
          this.$toast('毕业学校限制20个字符')
          return
        }
        if (!idCardReg.test(this.dataForm.studentIdCard)) {
          this.$toast('请输入正确身份证号码')
          return
        }
        this.$emit('changeStep', 2)
      })
    },
  },
}
</script>
<style lang="less" scoped>
.form-one {
  display: flex;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
.form-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-left: 15px;
  height: 60px;
  background-color: #f5f5f5;
}
.submit-form {
  .mar-t20 {
    margin-top: 0;
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
.form-list {
  flex: 1;
  overflow-y: scroll;
}
.form-footer {
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
