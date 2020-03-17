<template>
  <div class="personal qui-page qui-flex-ver">
    <header-com title="个人中心" isBack></header-com>
    <select-data title="切换角色" :select-list="roleList" v-model="roleTag" @confirm="chooseRole"></select-data>
    <div class="top qui-fx-jsb">
      <div class="info qui-fx-ac">
        <img src="" alt="" :onerror="errorImg">
        <div class="qui-fx-ver">
          <span class="name">{{ userInfo.userName }}</span>
          <span class="role">{{ userInfo.roleType === '1'? '家长' : userInfo.roleType === '2'? '班主任' : userInfo.roleType === '3' ? '教职工' : '校医' }}</span>
        </div>
      </div>
      <div class="school">{{ userInfo.schoolName }}</div>
    </div>
    <div class="submit-form qui-fx-f1">
      <div class="submit-item qui-fx-ac qui-bd-b">
        <div class="tip">身份类型</div>
        <div class="submit-input qui-tx-r qui-fx-f1" @click="roleTag = true">{{ dataForm.roleType }}</div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" v-if="userInfo.roleType==='2'">
        <div class="tip">我的班级</div>
        <div class="submit-input qui-tx-r qui-fx-f1" @click="goClass()">{{ dataForm.studentTotal }}人</div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" v-if="userInfo.roleType==='2'">
        <div class="tip">换绑班级</div>
        <div @click="isShow = true" class="qui-fx-f1 qui-tx-r" style="color:#666;margin-right:10px">
          <multi-menu title="换绑班级" :select-list="selectList" v-model="selectValue" @select="select"></multi-menu>
        </div>
        <div class="rit-icon"></div>
      </div>
      <div class="submit-item qui-fx-ac qui-bd-b" v-if="userInfo.roleType==='2'">
        <div class="tip">邀请学生</div>
        <div class="submit-input qui-tx-r qui-fx-f1" @click="invite()">点击分享链接</div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectData from '@c/common/SelectData'
import HeaderCom from '@com/HeaderCom'
import MultiMenu from '@c/common/MultiMenu'
import { store, actions } from '../../store'
export default {
  name: 'Personal',
  components: {
    HeaderCom,
    SelectData,
    MultiMenu
  },
  computed: {
    userInfo: () => store.userInfo
  },
  data() {
    return { 
      errorImg: 'this.src="' + require('@a/img/photo.png') + '"',
      detail: {},
      roleTag: false,
      isShow: false,
      roleList: [],
      classId: '',
      dataForm: {
        roleType: '',
        className: '',
        studentTotal: ''
      },
      type: '请选择',
      selectValue: [],
      selectList: [
        {
          id: 1,
          title: '高一',
          children: [
            {
              id: 1.1,
              title: '一班',
            },
            {
              id: 1.2,
              title: '二班',
            },
            {
              id: 1.3,
              title: '三班',
            }
          ]
        },
        {
          id: 1,
          title: '高二',
          children: [
            {
              id: 1.1,
              title: '一班',
            },
            {
              id: 1.2,
              title: '二班',
            },
            {
              id: 1.3,
              title: '三班',
            }
          ]
        },
        {
          id: 1,
          title: '高三',
          children: [
            {
              id: 1.1,
              title: '一班',
            },
            {
              id: 1.2,
              title: '二班',
            },
            {
              id: 1.3,
              title: '三班',
            }
          ]
        }
      ]
    }
  },
  created() {
    this.dataForm.roleType = this.userInfo.roleType === '1'? '家长' : this.userInfo.roleType === '2'? '班主任' : this.userInfo.roleType === '3' ? '教职工' : '校医'
    this.dataForm.className = this.userInfo.gradeName + this.userInfo.className
    this.dataForm.studentTotal = this.userInfo.studentTotal
    console.log(this.userInfo.roleType)
  },
  async mounted() {
    this.getRoleList()
    this.getClass()
  },
  methods: {
    //查询可切换的角色
    async getRoleList(){
      this.roleList = []
      const req = {
        //userCode : this.userInfo.userCode,
        //schoolCode : this.userInfo.schoolCode,
        schoolCode : 'CANPOINT', 
        userCode : 'ST14f6u8nudwtgb',  
      }
      const res = await actions.getRoleInfo(req)
      res.result.forEach(ele=>{
        this.roleList.push({
          id:ele.roleCode,
          text:ele.roleName
        })
      })
      console.log(this.roleList)
    },
    // 切换角色
    chooseRole(item) {
      this.dataForm.roleType = item.text
      console.log(this.dataForm.roleType)
    },
    //查询班主任绑定的班级
    async getClass(){
      const req = {
        //teacherCode : this.userInfo.teacherCode,
        //schoolCode : this.userInfo.schoolCode,
        //userCode : this.userInfo.userCode,
        schoolCode : 'CANPOINT', 
        teacherCode : 'ST14f6u8nudwtgb',  
      }
      const res = await actions.getMyClass(req)
      this.selectValue = res.result.clazzName
      this.classId = res.result.clazzCode
    },
    // 换绑班级
    async select(item) {
      console.log(item)
      const req = {
        //teacherCode : this.userInfo.teacherCode,
        //schoolCode : this.userInfo.schoolCode,
        schoolCode : 'CANPOINT', 
        teacherCode : 'ST14f6u8nudwtgb',  
        id: this.classId,
        classCode: item
      }
      const res = await actions.changeMyClass(req)
      this.dataForm.className = res.result.className
    },
    //我的班级
    goClass(){
      this.$router.push('/myClass')
    },
    //邀请学生
    invite(){
    }
  }
}
</script>

<style lang="less" scoped>
.personal {
  background: #fff;
  .top{
    width:100%;
    height:362px;
    background: url('../../assets/img/bg.png') no-repeat;
    background-size: 100% 362px;
    margin-top:20px;
    color:#fff;
    .info{
      margin:0 0 0 10%;
      height:300px;
      img{
        width: 160px;
        height: 160px;
        margin-right: 38px;
        background: rgba(255, 255, 255, 0.6);
        padding: 6px;
        border-radius: 100%;
      }
      .name{
        font-size:38px;
        font-weight: bold;
        margin-bottom: 18px;
      }
      .role{
        border:1px solid #fff;
        border-radius: 16px;
        padding: 0 20px;
      }
    }
    .school{
      margin:30px 60px 0 0;
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
      background:url('../../assets/img/right.png') no-repeat;
      background-size: 100%;
    }
  }
}
</style>
