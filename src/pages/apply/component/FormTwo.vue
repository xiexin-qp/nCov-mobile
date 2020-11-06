<template>
  <div class="form-two qui-fx-f1 qui-fx-ver">
    <select-data title="居住类型" :select-list="liveType" v-model="liveTag" @confirm="chooseLiveType"></select-data>
    <div class="census-msg">户籍信息</div>
    <div class="submit-form qui-fx-f1 form-list">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">户口性质</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.houseType">
            <van-radio name="农业">农业</van-radio>
            <van-radio name="非农" style="margin-left: 15px">非农</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">户口地址</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.houseAddress" type="text" placeholder="请输入户口地址" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">所属派出所</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.policeStation" type="text" placeholder="输入所属派出所名称" />
        </div>
      </div>
      <div class="mar-t20">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">居住类型</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="liveTag = true">
            {{ dataForm.liveType || '请选择居住类型' }}
          </div>
          <div class="rit-icon"></div>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">家庭地址</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.address" type="text" placeholder="输入家庭现住址" />
        </div>
      </div>
      <div class="parents-msg">
        <div class="msg-title">家长信息</div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">家长姓名</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.parentName" type="text" placeholder="输入家长姓名" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">家长手机</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.parentTel" type="text" placeholder="家长手机" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">与本人关系</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.relation" type="text" placeholder="输入家长与本人关系，如：父亲" />
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">是否监护人</div>
        <div class="submit-input qui-fx-f1 qui-fx-je">
          <van-radio-group class="qui-fx-ac" v-model="dataForm.isGuardian">
            <van-radio name="是">是</van-radio>
            <van-radio name="否" style="margin-left: 15px">否</van-radio>
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
import validateForm from '@u/validate'
import SelectData from '@c/common/SelectData'
import { Radio } from 'vant'
const yzForm = {
  houseAddress: '请输入户口地址',
  policeStation: '请输入所属派出所',
  liveType: '请选择居住类型',
  address: '请输入家庭地址',
  parentName: '请输入家长姓名',
  parentTel: '请输入家长手机号码',
  relation: '请输入家长与本人关系',
}
export default {
  props: {
    dataForm: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    [Radio.name]: Radio,
    SelectData,
  },
  data() {
    return {
      liveTag: false,
      liveType: [
        {
          id: 1,
          text: '农村',
        },
        {
          id: 2,
          text: '城镇',
        },
        {
          id: 3,
          text: '县城',
        },
      ],
    }
  },
  mounted() {},
  methods: {
    nextTo() {},
    // 选择居住类型
    chooseLiveType(item) {
      this.dataForm.liveType = item.text
    },
    // 下一页
    goNext() {
      validateForm(yzForm, this.dataForm, () => {
        if (this.dataForm.houseAddress.trim().length > 20) {
          this.$toast('户口地址限制20个字符')
          return
        }
        if (this.dataForm.policeStation.trim().length > 20) {
          this.$toast('所属派出所限制20个字符')
          return
        }
        if (this.dataForm.address.trim().length > 20) {
          this.$toast('家庭地址限制20个字符')
          return
        }
        if (this.dataForm.parentName.trim().length > 20) {
          this.$toast('家长姓名限制20个字符')
          return
        }
        if (this.dataForm.relation.trim().length > 10) {
          this.$toast('与本人关系限制10个字符')
          return
        }
        const telReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (!telReg.test(this.dataForm.parentTel)) {
          this.$toast('请输入正确手机号码')
          return
        }
        this.$emit('changeStep', 3)
      })
    },
    // 上一页
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
