<template>
  <div class="qui-fx-f1 qui-fx-ver">
    <header-com title="提交返校计划" isBack></header-com>
    <select-data title="出行方式" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
    <van-popup v-model="fromArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="fromArea = false"
      />
    </van-popup>
    <van-popup v-model="toArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="toArea = false"
      />
    </van-popup>
    <date-time v-model="timeTag" @get-date="getDate" type="date" :minDate="minDate" :maxDate="maxDate"></date-time>
    <div class="submit-form qui-fx-f1">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">姓名</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.name" type="text" placeholder="请输入姓名" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">返校日期</div>
        <div
          class="submit-input qui-tx-r qui-fx-f1"
          @click="showDate('startTime')"
        >{{ dataForm.startTime }}</div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" @click="fromArea = true">
        <div class="tip">出发地</div>
        <div
          class="submit-input qui-tx-r qui-fx-f1"
        >{{ dataForm.fromAddress }}</div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" @click="toArea = true">
        <div class="tip">目的地</div>
        <div
          class="submit-input qui-tx-r qui-fx-f1"
        >{{ dataForm.toAddress }}</div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">出行方式</div>
        <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
        <div class="rit-icon"></div>
      </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">出行备注</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.remark" type="text" placeholder="输入车牌号、车次号、航班号等" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">是否接触疫情人员(近14天)</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-switch v-model="dataForm.isMarry" />
        </div>
      </div>
      <div class="submit-area qui-fx-ver">
        <div class="tip">健康状态</div>
        <div class="qui-fx-f1" style="padding: 10px 0 ">
          <van-checkbox-group v-model="dataForm.health">
            <van-checkbox style="margin-bottom: 10px" shape="square" name="1">正常</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="2">发热</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="3">腹泻</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="4">咳嗽</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="4">鼻塞流涕</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
      <div class="submit-area qui-fx-ver">
        <div class="tip">高发地旅居史(近14天)</div>
        <div class="qui-fx-f1" style="padding: 10px 0 ">
          <van-checkbox-group v-model="dataForm.treavl">
            <van-checkbox style="margin-bottom: 10px" shape="square" name="1">无</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="2">湖北</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="3">意大利</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="4">韩国</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="4">西班牙</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
      <div class="submit-area qui-fx-ver">
        <div class="tip">被诊断为确诊/疑似/隔离经历</div>
        <div class="qui-fx-f1" style="padding: 10px 0 ">
          <van-checkbox-group v-model="dataForm.diagnose">
            <van-checkbox style="margin-bottom: 10px" shape="square" name="1">无</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="2">确诊</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="3">疑似</van-checkbox>
            <van-checkbox style="margin-bottom: 10px" shape="square" name="4">隔离</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
      <div class="submit-area qui-fx-ver">
        <div class="tip">个人说明</div>
        <div class="qui-fx-f1">
          <textarea class="text-area" v-model="dataForm.address" placeholder="输入不能正常返校等原因说明"></textarea>
        </div>
      </div>
    </div>
    <van-button type="primary" @click="submitForm">提交</van-button>
  </div>
</template>
<script>
import HeaderCom from '@com/HeaderCom'
import SelectData from '@c/common/SelectData'
import DateTime from '@c/common/DateTime'
import validateForm from '@u/validate'
import { RadioGroup, Radio, Switch, Checkbox, CheckboxGroup, Area } from 'vant'
const yzForm = {
  name: '请输入姓名',
  address: '请输入家庭住址',
  type: '请选择身份类型',
  startTime: '请选择开始时间',
  endTime: '请选择结束时间'
}
export default {
  name: 'SubmitBack',
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Switch.name]: Switch,
    [Area.name]: Area,
    SelectData,
    DateTime,
    HeaderCom
  },
  props: {},
  computed: {},
  data() {
    return {
      typeTag: false,
      timeTag: false,
      fromArea: false,
      toArea: false,
      areaList: {},
      minDate: new Date(),
      maxDate: new Date(new Date().getTime()+3600*24*365*3*1000),
      typeList: [
        {
          id: 1,
          text: '自驾'
        },
        {
          id: 2,
          text: '飞机'
        },
        {
          id: 3,
          text: '火车'
        },
        {
          id: 4,
          text: '其它'
        }
      ],
      dataForm: {
        name: '',
        sex: '1',
        isMarry: true,
        health: [],
        fromAddress: '选择出发地',
        toAddress: '选择目的地',
        type: '选择出行方式',
        startTime: '选择日期',
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
    // 选择地区
    onConfirm(values) {
      //this.value = values.map(item => item.name).join('/');
      console.log(values)
      this.showArea = false;
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
    background-color: @main-color;
    text-align: center;
  }
}
</style>
