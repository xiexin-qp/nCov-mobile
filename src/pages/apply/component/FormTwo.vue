<template>
  <div class="form-two qui-fx-f1 qui-fx-ver">
    <select-data title="身份类型" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
    <select-panel title="民族" :select-list="typeList" v-model="nationTag" @confirm="chooseNation"></select-panel>
    <div class="census-msg">户籍信息</div>
    <div class="submit-form qui-fx-f1 form-list">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">户口性质</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.sex">
            <van-radio name="1">农业</van-radio>
            <van-radio name="2" style="margin-left: 15px">非农</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">户口地址</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.idCard" type="text" placeholder="请输入户口地址" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">所属派出所</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.idCard" type="text" placeholder="输入所属派出所名称" />
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">居住类型</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">家庭地址</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.idCard" type="text" placeholder="输入家庭现住址" />
        </div>
      </div>
      <div class="parents-msg">
        <div class="msg-title">家长信息</div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">家长姓名</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.idCard" type="text" placeholder="输入家长姓名" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">家长手机</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.idCard" type="text" placeholder="家长手机" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">与本人关系</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.idCard" type="text" placeholder="输入家长与本人关系，如：父亲" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">是否监护人</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.sex">
            <van-radio name="1">是</van-radio>
            <van-radio name="2" style="margin-left: 15px">否</van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>
    <div class="form-footer">
      <van-button
        @click="goBack"
        type="info"
        size="normal"
        style="width: 35%; border-radius: 8px"
        color="rgba(22, 155, 213, 1)"
        >上一步</van-button
      >
      <van-button
        @click="goNext"
        type="info"
        size="normal"
        style="width: 35%; border-radius: 8px"
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
      this.$emit('changeStep', 3)
    },
    goBack() {
      this.$emit('changeStep', 1)
    },
  },
}
</script>
<style lang="less" scoped>
.form-two {
  display: flex;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
.census-msg {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  padding-left: 20px;
  padding-top: 10px;
  font-weight: 600;
}
.parents-msg {
  display: flex;
  align-items: flex-end;
  height: 80px;
  background-color: #f5f5f5;
  .msg-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    padding-left: 20px;
    padding-top: 10px;
    font-weight: 600;
    background-color: #fff;
  }
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
