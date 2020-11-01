<template>
  <div class="form-one qui-fx-f1 qui-fx-ver">
    <select-data title="身份类型" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
    <select-panel title="民族" :select-list="typeList" v-model="nationTag" @confirm="chooseNation"></select-panel>
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
          <van-radio-group class="qui-fx-ac" v-model="dataForm.sex">
            <van-radio name="1">男</van-radio>
            <van-radio name="2" style="margin-left: 15px">女</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">身份证号</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.idCard" type="text" placeholder="请输入身份证号" />
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">民族</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">政治面貌</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">学生来源</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.sex">
            <van-radio name="1">应届</van-radio>
            <van-radio name="2" style="margin-left: 15px">非应届</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">毕业学校</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.studentName" type="text" placeholder="请输入姓名" />
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">申请专业</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
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
import SelectData from '@c/common/SelectData'
import SelectPanel from '../component/SelectPanel'
import { Radio } from 'vant'
export default {
  components: {
    [Radio.name]: Radio,
    SelectData,
    SelectPanel,
  },
  data() {
    return {
      formTitle: '旬阳中等职业学校',
      typeTag: false,
      dataForm: {
        studentName: '',
        sex: '1',
        idCard: '',
        type: '请选择',
        nation: '请选择',
      },
      typeList: [
        {
          id: 1,
          text: '身份证',
        },
        {
          id: 2,
          text: '驾驶证',
        },
        {
          id: 3,
          text: '港澳通行证',
        },
      ],
    }
  },
  mounted() {},
  methods: {
    nextTo() {},
    // 选择民族
    chooseType(item) {
      this.dataForm.type = item.text
    },
    // 选择民族
    chooseNation() {
      this.dataForm.nation = item.text
    },
    goNext() {
      this.$emit('changeStep', 2)
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
