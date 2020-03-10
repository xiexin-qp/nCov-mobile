<template>
  <div class="qui-page qui-flex-ver">
    <popup-box
      v-model="isShow"
      @confirm="isShow = false"
      :cancel-text="'取消'"
      width="80"
      height="80"
    >
      <div slot="title" style="padding: 10px; text-align:center">
        <van-search v-model="searchName" placeholder="请输入姓名" />
      </div>
      <div class="info-list">
        <div
          style="height: 2rem; line-height: 2rem; padding-left: 10px"
          class="qui-bd-b"
          v-for="i in 20"
          :key="i"
        >{{ i }}</div>
      </div>
    </popup-box>
    <div class="qui-fx-f1 qui-fx-ver">
      <select-data title="测量部位" :select-list="typeList" v-model="typeTag" @confirm="chooseType"></select-data>
      <select-data title="学生姓名" :select-list="studentList" v-model="studentTag" @confirm="chooseStudent"></select-data>
      <div class="submit-form qui-fx-f1">
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">姓名</div>
          <div class="submit-input qui-fx-f1" @click="isShow = true">
            <input class="input" readonly v-model="dataForm.name" type="text" />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">姓名</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="studentTag = true">{{ dataForm.name }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">体温</div>
          <div class="submit-input qui-fx-f1">
            <input
              class="input"
              v-model="dataForm.temp"
              type="text"
              placeholder="请输入测量值，正常值为36.2～37.3"
            />
          </div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">测量部位</div>
          <div class="submit-input qui-tx-r qui-fx-f1" @click="typeTag = true">{{ dataForm.type }}</div>
          <div class="rit-icon"></div>
        </div>
        <div class="submit-item qui-fx-ac qui-bd-b">
          <div class="tip">是否接触疫情人员</div>
          <div class="submit-input qui-fx-f1 qui-fx-je">
            <van-switch v-model="dataForm.isTrue" />
          </div>
        </div>
        <div class="submit-area qui-fx-ver">
          <div>附带症状</div>
          <div class="qui-fx-f1" style="padding: 10px 0 ">
            <van-checkbox-group v-model="dataForm.health">
              <van-checkbox style="margin-bottom: 10px" shape="square" name="1">咳嗽</van-checkbox>
              <van-checkbox style="margin-bottom: 10px" shape="square" name="2">腹泻</van-checkbox>
              <van-checkbox style="margin-bottom: 10px" shape="square" name="3">咽痛</van-checkbox>
              <van-checkbox style="margin-bottom: 10px" shape="square" name="4">乏力</van-checkbox>
              <van-checkbox style="margin-bottom: 10px" shape="square" name="5">鼻塞流涕</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
        <div class="submit-area qui-fx-ver">
          <div>其他说明</div>
          <div class="qui-fx-f1">
            <textarea
              class="text-area"
              v-model="dataForm.remark"
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
const yzForm = {
  name: '请输入姓名',
  temp: '请输入体温',
  type: '请选择测量部位'
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
      typeList: [
        {
          id: 1,
          text: '腋下、颈部'
        },
        {
          id: 2,
          text: '口腔'
        },
        {
          id: 3,
          text: '额头、面部'
        }
      ],
      dataForm: {
        name: '李雷',
        temp: '',
        isTrue: true,
        health: [],
        remark: '',
        type: '请选择'
      },
      studentList: [
        {
          id: 1,
          text: '李雷'
        },
        {
          id: 2,
          text: '韩梅梅'
        },
        {
          id: 3,
          text: '刘芳'
        },
        {
          id: 4,
          text: '刘芳'
        },
        {
          id: 5,
          text: '刘芳'
        },
        {
          id: 6,
          text: '刘芳'
        }
      ],
      studentTag:false,

    }
  },
  async mounted() {},
  methods: {
    onSearch() {},
    submitForm() {
      validateForm(yzForm, this.dataForm, () => {})
    },
    // 选择身份
    chooseType(item) {
      this.dataForm.type = item.text
    },
    chooseStudent(item) {
      this.dataForm.name = item.text
    },
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
</style>
