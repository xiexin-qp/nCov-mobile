<template>
  <div class="personal qui-page qui-flex-ver">
    <header-com title="个人中心" isBack></header-com>
    <grade-class v-if="classTag" v-model="classTag" @confirm="chooseClass"></grade-class>
    <select-data title="切换角色" :select-list="roleList" v-model="roleTag" @confirm="chooseRole"></select-data>
    <div class="top qui-fx-jsb">
      <div class="info qui-fx-ac">
        <img :src="userInfo.profilePhoto ? userInfo.profilePhoto : errorImg" alt="" :onerror="errorImg" />
        <div class="qui-fx-ver">
          <span class="name">{{ userInfo.userName }}</span>
          <span class="role">{{
            userInfo.roleCode === 'JZ'
              ? '家长'
              : userInfo.roleCode === 'BZR'
              ? '班主任'
              : userInfo.roleCode === 'JZG'
              ? '教职工'
              : '校医'
          }}</span>
        </div>
      </div>
      <div class="school">{{ userInfo.schoolName }}</div>
    </div>
    <div class="submit-form qui-fx-f1">
      <div class="submit-item qui-fx-ac qui-bd-b" v-if="canChangeRole">
        <div class="tip">身份类型</div>
        <div class="submit-input qui-tx-r qui-fx-f1" @click="roleTag = true">{{ dataForm.roleType }}</div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" @click="goClass()" v-if="userInfo.roleCode === 'BZR'">
        <div class="tip">我的班级</div>
        <div class="submit-input qui-tx-r qui-fx-f1"><!-- {{ dataForm.studentTotal }}人 --></div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" v-if="userInfo.roleCode === 'BZR'" @click="classTag = true">
        <div class="tip">换绑班级</div>
        <div class="qui-fx-f1 qui-tx-r" style="color: #666; margin-right: 10px;">{{ dataForm.className }}</div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" @click="backSchool">
        <div class="tip">返校计划</div>
        <div class="qui-fx-f1 qui-tx-r" style="color: #666; margin-right: 10px;"></div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" v-if="userInfo.roleCode === 'BZR'">
        <div class="tip">邀请学生</div>
        <div class="submit-input qui-tx-r qui-fx-f1" @click="invite()">点击分享链接</div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import SelectData from '@c/common/SelectData'
import HeaderCom from '@com/HeaderCom'
import GradeClass from '@c/common/GradeClass'
import { store, setStore, actions } from '../../store'
export default {
  name: 'Personal',
  components: {
    HeaderCom,
    SelectData,
    GradeClass,
  },
  computed: {
    userInfo: () => store.userInfo,
  },
  data() {
    return {
      errorImg: 'this.src="' + require('@a/img/photo.png') + '"',
      detail: {},
      roleTag: false,
      classTag: false,
      canChangeRole: false,
      roleList: [],
      classId: '',
      dataForm: {
        roleType: '',
        className: '',
        studentTotal: '',
      },
      type: '请选择',
    }
  },
  created() {
    this.dataForm.roleType =
      this.userInfo.roleCode === 'JZ'
        ? '家长'
        : this.userInfo.roleCode === 'BZR'
        ? '班主任'
        : this.userInfo.roleCode === 'JZG'
        ? '教职工'
        : '校医'
    this.dataForm.className = this.userInfo.gradeName + this.userInfo.clazzName
    this.dataForm.studentTotal = this.userInfo.studentTotal
    console.log(this.dataForm.className)
  },
  async mounted() {
    this.getRoleList()
    this.getClass()
  },
  methods: {
    // 邀请家长注册
    shareParent() {
      wx.updateAppMessageShareData({
        title: '家长注册', // 分享标题
        desc: '疫情防控家长注册', // 分享描述
        link: `http://ai2.canpoint.net/nCov/register/?schoolCode=${this.userInfo.schoolCode}#/`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://ai2.canpoint.net/nCov/ncov.png', // 分享图标
        success: function () {},
      })
      wx.updateTimelineShareData({
        title: '家长注册', // 分享标题
        link: `http://ai2.canpoint.net/nCov/register/?schoolCode=${this.userInfo.schoolCode}#/`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://ai2.canpoint.net/nCov/ncov.png', // 分享图标
        success: function () {},
      })
    },
    //查询可切换的角色
    async getRoleList() {
      this.roleList = []
      const req = {
        userCode: this.userInfo.userCode,
        schoolCode: this.userInfo.schoolCode,
      }
      const res = await actions.getRoleInfo(req)
      if (res.result.length <= 1) {
        this.canChangeRole = false
        return
      }
      this.canChangeRole = true
      if (this.userInfo.roleCode === 'JZ') {
        this.roleList.push({
          id: 'JZG',
          text: '教职工',
        })
      } else {
        this.roleList.push({
          id: 'JZ',
          text: '家长',
        })
      }
    },
    // 切换角色
    async chooseRole(item) {
      this.dataForm.roleType = item.text
      const req = {
        userCode: this.userInfo.userCode,
        schoolCode: this.userInfo.schoolCode,
        userType: item.id,
      }
      const res = await actions.changeRole(req)
      console.log(res)
      const result = {}
      for (let item in res.result) {
        if (res.result[item] !== null) {
          result[item] = res.result[item]
        }
      }
      setStore({
        key: 'userInfo',
        data: {
          ...this.userInfo,
          ...result,
        },
      })
      this.getRoleList()
    },
    // 换绑班级
    async chooseClass(item) {
      this.dataForm.className = item.gradeName + item.clazzName
      const req = {
        teacherCode: this.userInfo.userCode,
        schoolCode: this.userInfo.schoolCode,
        gradeCode: item.gradeCode,
        classCode: item.clazzCode,
      }
      const res = await actions.changeMyClass(req)
      if (res.success) {
        setStore({
          key: 'userInfo',
          data: {
            ...this.userInfo,
            gradeId: item.gradeCode,
            gradeCode: item.gradeCode,
            gradeName: item.gradeName,
            clazzName: item.clazzName,
            clazzCode: item.clazzCode,
          },
        })
      }
    },
    //查询班主任绑定的班级
    async getClass() {
      if (this.userInfo.roleCode !== 'BZR') {
        return
      }
      const req = {
        teacherCode: this.userInfo.userCode,
        schoolCode: this.userInfo.schoolCode,
      }
      await actions.getMyClass(req)
      // this.dataForm.className = res.result.gradeName + res.result.clazzName
    },
    //我的班级
    goClass() {
      this.$router.push('/myClass')
    },
    backSchool() {
      this.$router.push('/backSchool')
    },
    //邀请学生
    invite() {},
  },
}
</script>

<style lang="less" scoped>
.personal {
  background: #fff;
  .top {
    width: 100%;
    height: 362px;
    background: url('../../assets/img/bg.png') no-repeat;
    background-size: 100% 362px;
    margin-top: 20px;
    color: #fff;
    .info {
      margin: 0 0 0 10%;
      height: 300px;
      img {
        width: 160px;
        height: 160px;
        margin-right: 38px;
        background: rgba(255, 255, 255, 0.6);
        padding: 6px;
        border-radius: 100%;
      }
      .name {
        font-size: 38px;
        font-weight: bold;
        margin-bottom: 18px;
      }
      .role {
        border: 1px solid #fff;
        border-radius: 16px;
        padding: 0 20px;
      }
    }
    .school {
      margin: 30px 60px 0 0;
      font-size: 28px;
    }
  }
  .submit-form {
    .submit-item {
      background-color: #fff;
      height: 95px;
      margin: 0px 25px 0px 40px;
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
    .rit-icon {
      width: 18px;
      height: 30px;
      background: url('../../assets/img/right.png') no-repeat;
      background-size: 100%;
    }
  }
}
</style>
