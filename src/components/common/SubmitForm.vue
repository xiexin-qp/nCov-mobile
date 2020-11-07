<template>
  <div class="u-fx-f1 u-fx-ver">
    <select-data title="身份类型" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
    <date-time v-model="timeTag" @get-date="getDate"></date-time>
    <div class="submit-form u-fx-f1">
      <div class="submit-item u-fx-ac u-bd-b">
        <div class="tip">姓名</div>
        <div class="submit-input u-fx-f1">
          <input class="input" v-model="dataForm.name" type="text" placeholder="请输入姓名" />
        </div>
      </div>
      <div class="submit-item u-fx-ac u-bd-b">
        <div class="tip">性别</div>
        <div class="submit-input u-fx-f1 u-fx-je">
          <van-radio-group class="u-fx-ac" v-model="dataForm.sex">
            <van-radio name="1">男</van-radio>
            <van-radio name="2" style="margin-left: 15px">女</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit-item u-fx-ac u-bd-b">
        <div class="tip">是否已婚</div>
        <div class="submit-input u-fx-f1 u-fx-je">
          <van-switch v-model="dataForm.isMarry" />
        </div>
      </div>
      <div class="submit-area u-fx-ver">
        <div class="tip">身体状态</div>
        <div class="u-fx-f1" style="padding: 10px 0 ">
          <van-checkbox-group v-model="dataForm.health">
            <van-checkbox style="margin-bottom: 10px" shape="square" name="1">正常</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="2">发热</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="3">头晕</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="4">眼花</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
      <div class="submit-area u-fx-ver">
        <div class="tip">家庭住址</div>
        <div class="u-fx-f1">
          <textarea class="text-area" v-model="dataForm.address" placeholder="请输入家庭住址"></textarea>
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">身份类型</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">开始日期</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="showDate('startTime')">{{ dataForm.startTime }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">结束日期</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="showDate('endTime')">{{ dataForm.endTime }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class>时长</div>
          <div class="submit-input u-tx-r u-fx-f1">9小时</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-area u-fx-ver">
          <div class="tip">附件上传</div>
          <div class="upload-list u-fx-f1">
            <upload-file v-model="dataForm.fileList"></upload-file>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-bottom">
      <div class="submit-btn" @click="submitForm">提交</div>
    </div>
  </div>
</template>
<script>
import UploadFile from '@c/common/UploadFile'
import SelectData from '@c/common/SelectData'
import DateTime from '@c/common/DateTime'
import validateForm from '@u/validate'
import { RadioGroup, Radio, Switch, Checkbox, CheckboxGroup } from 'vant'
const yzForm = {
  name: '请输入姓名',
  address: '请输入家庭住址',
  type: '请选择身份类型',
  startTime: '请选择开始时间',
  endTime: '请选择结束时间'
}
export default {
  name: 'SubmitForm',
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Switch.name]: Switch,
    UploadFile,
    SelectData,
    DateTime
  },
  props: {},
  computed: {},
  data() {
    return {
      typeTag: false,
      timeTag: false,
      typeList: [
        {
          id: 1,
          text: '身份证'
        },
        {
          id: 2,
          text: '驾驶证'
        },
        {
          id: 3,
          text: '港澳通行证'
        }
      ],
      dataForm: {
        name: '',
        sex: '1',
        isMarry: true,
        health: [],
        address: '',
        type: '请选择',
        startTime: '请选择',
        endTime: '请选择',
        fileList: []
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
}
</style>
