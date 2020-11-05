<template>
  <div class="back-school u-page u-fx-ver">
    <header-com title="返校计划" isBack></header-com>
    <no-data v-if="false" msg="暂无返校计划~"></no-data>
    <div v-if="false" class="button u-fx-jc">
      <van-button size="normal" v-if="true" type="primary" @click="submitBack(0)">提交返校计划</van-button>
    </div>
    <div v-if="true" class="info">
      <div class="u-fx">
        <p>状态：</p>
        <p>已拒绝</p>
      </div>
      <div class="u-fx">
        <p>审批备注：</p>
        <p>因个人健康风险原因，请暂时居家隔离</p>
      </div>
    </div>
    <scroll-list v-if="true" ref="scroll">
      <div class="submit-form u-fx-f1">
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">姓名</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="roleTag = true">{{ dataForm.userName }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b" v-if="userInfo.roleCode === 'BZR'">
          <div class="tip">返校日期</div>
          <div class="submit-input u-tx-r u-fx-f1" @click="goClass()">{{ dataForm.backTime }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">出发地</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.fromAdd }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">目的地</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.toAdd }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">出行方式</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.tripMode }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">出行备注</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.tripRemark }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">健康状态</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.healthType }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">是否疫情接触人员(近14天)</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.hasTouch }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">高发地旅居史(近14天)</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.travelRecord }}</div>
        </div>
        <div class="submit-item u-fx-ac u-bd-b">
          <div class="tip">被诊断为确诊/疑似/隔离经历</div>
          <div class="u-fx-f1 u-tx-r" style="color:#666;margin-right:10px">{{ dataForm.diagRecord }}</div>
        </div>
        <div class="submit-item u-fx-ver u-bd-b" style="height:100%;padding:10px 20px">
          <div class="tip">个人说明</div>
          <div class="submit-box">
            {{ dataForm.personalRemark }}
          </div>
        </div>
      </div>
    </scroll-list>
    <van-button v-if="true" type="primary" @click="submitBack(1)">重新提交</van-button>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import NoData from '@c/common/NoData'
import ScrollList from '@com/ScrollList'
import { store, actions } from '../../store'
export default {
  name: 'BackSchool',
  components: {
    HeaderCom,
    ScrollList,
    NoData
  },
  computed: {
    userInfo: () => store.userInfo
  },
  data() {
    return {
      errorImg: 'this.src="' + require('@a/img/photo.png') + '"',
      id: '',
      dataForm: {
        userName: '张立',
        backTime: '2020-04-08',
        fromAdd: '湖北省荆州市',
        toAdd: '湖北省武汉市',
        tripMode: '自驾',
        tripRemark: '鄂A88888',
        healthType: '健康',
        hasTouch: '无',
        travelRecord: '无',
        diagRecord: '无',
        personalRemark: '无'
      }
    }
  },
  async mounted() {
    this.showList()
  },
  methods: {
    async showList() {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        teacherCode: this.userInfo.userCode,
        clazzCode: this.userInfo.classCode,
        pageNum: 1,
        pageSize: 15
      }
      const res = await actions.getStudentsList(req)
      console.log(res)
    },
    submitBack(type) {
      const query = {}
      if (type) {
        query.id = this.id
      }
      this.$router.push({ path: '/submitBack', query })
    }
  }
}
</script>

<style lang="less" scoped>
.back-school {
  .info {
    margin: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 1px 1px #ddd;
    padding: 20px 40px;
    div {
      margin: 10px 0;
      p {
        width: 75%;
      }
      p:first-child {
        text-align: right;
        margin-right: 10px;
        width: calc(25% - 10px);
      }
    }
  }
  .submit-form {
    background-color: #fff;
    padding-bottom: 10px;
    .submit-item {
      height: 95px;
      margin: 10px 0;
      padding: 0 20px 0 40px;
      .submit-input {
        color: #666;
        margin: 0 30px;
        .input {
          text-align: right;
          width: 100%;
          border: none;
          height: 66px;
          line-height: 66px;
        }
      }
    }
    .submit-box {
      margin: 20px 0;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px 20px;
    }
  }
}
</style>
