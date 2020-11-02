<template>
  <div class="form-two qui-fx-f1 qui-fx-ver">
    <div class="census-msg">其他信息</div>
    <div class="submit-form qui-fx-f1 form-list">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">健康状况</div>
        <div class="submit-input qui-fx-f1">
          <input class="input" v-model="dataForm.physical" type="text" placeholder="输入健康状况，如：良好、残疾" />
        </div>
      </div>
      <div class="submit-area qui-fx-ver">
        <div class="tip">人脸照片</div>
        <div class="upload-list qui-fx-f1">
          <upload-file :max-num="1" v-model="dataForm.profilePhoto"></upload-file>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">联系手机&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="get-code submit-input qui-fx-f1">
          <input class="input code-input" v-model="dataForm.regTel" type="text" placeholder="输入联系手机号" />
          <div class="code-btn">
            <van-button type="info" size="small" style="border-radius: 8px" color="rgba(22, 155, 213, 1)"
              >获取验证码</van-button
            >
          </div>
        </div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">短信验证码</div>
        <div class="get-code submit-input qui-fx-f1">
          <input class="input code-input" v-model="dataForm.regCode" type="text" placeholder="输入短信验证码" />
          <div class="code-btn" />
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
        @click="submit"
        type="info"
        size="normal"
        style="width: 35%; border-radius: 8px"
        color="rgba(22, 155, 213, 1)"
        >确认提交</van-button
      >
    </div>
  </div>
</template>

<script>
import UploadFile from '@c/common/UploadFile'
import { Radio } from 'vant'
export default {
  components: {
    [Radio.name]: Radio,
    UploadFile,
  },
  props: {
    dataForm: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      profilePhoto: [],
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
    goBack() {
      this.$emit('changeStep', 2)
    },
    // 提交
    submit() {
      if (this.dataForm.physical.trim().length === 0) {
        this.$toast('请输入健康状况')
        return
      }
      if (this.dataForm.physical.trim().length > 10) {
        this.$toast('健康状况限制10个字符')
        return
      }
      if (this.dataForm.profilePhoto.length === 0) {
        this.$toast('请上传申请学生人脸照片')
        return
      }
      // const base64 = this.profilePhoto[0].url

      if (!/^1[3456789]\d{9}$/.test(this.dataForm.regTel)) {
        this.$toast('请输入正确手机号')
        return
      }
      if (this.dataForm.regCode.trim().length === 0) {
        this.$toast('请输入短信验证码')
        return
      }
      this.$emit('submit')
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
        flex: 1;
        text-align: right;
        border: none;
        width: 100%;
        height: 66px;
        line-height: 66px;
      }
      .code-input {
        width: 60%;
      }
      .code-btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 40%;
      }
    }

    .get-code {
      display: flex;
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
