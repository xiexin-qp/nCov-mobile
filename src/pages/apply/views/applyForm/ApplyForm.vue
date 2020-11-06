<template>
  <div class="apply qui-fx-ver">
    <Header :title="`填写申请(${step}/3)`" />
    <div class="from-main">
      <FormOne v-show="step == 1" @changeStep="changeStep" :dataForm="dataForm" />
      <FormTwo v-show="step == 2" @changeStep="changeStep" :dataForm="dataForm" />
      <FormThree v-show="step == 3" @changeStep="changeStep" :dataForm="dataForm" @submit="submit" />
    </div>
  </div>
</template>

<script>
import Header from '../../component/Header.vue'
import FormOne from '../../component/FormOne.vue'
import FormTwo from '../../component/FormTwo.vue'
import FormThree from '../../component/FormThree.vue'
import { actions } from '../../store/index'
import { Toast } from 'vant'

export default {
  name: 'ApplyFrom',
  components: {
    Header,
    FormOne,
    FormTwo,
    FormThree,
  },
  computed: {},
  data() {
    return {
      step: 1,
      dataForm: {
        studentName: '', // 学生姓名
        studentSex: '0', // 学生性别
        studentIdCard: '', // 身份证号码
        studentNation: '汉族', // 民族
        identity: '群众', // 政治面貌
        source: '应届', // 学生来源
        lastSchool: '', // 毕业学校
        applyProject: '', // 申请专业
        subjectCode: '', // 申请专业code
        houseType: '农业', // 户口性质
        houseAddress: '', // 户口地址
        policeStation: '', // 所属派出所
        liveType: '', // 居住类型
        address: '', // 家庭地址
        parentName: '', // 家长姓名
        parentTel: '', // 家长手机
        relation: '', // 与本人关系
        isGuardian: '是', // 是否监护人
        physical: '', // 健康状况,
        profilePhoto: [], // 人脸照片
        regTel: '', // 联系手机
        regCode: '', // 短信验证码
      },
    }
  },
  mounted() {},
  methods: {
    changeStep(step) {
      this.step = step
    },
    submit() {
      const req = {
        code: this.dataForm.regCode,
        gender: this.dataForm.studentSex,
        grade: 2020,
        graduationSchool: this.dataForm.lastSchool,
        hasGuardian: this.dataForm.isGuardian == '是' ? true : false,
        healthyState: this.dataForm.physical,
        homeAddress: this.dataForm.address,
        idNumber: this.dataForm.studentIdCard,
        majorCode: this.dataForm.subjectCode,
        majorName: this.dataForm.applyProject,
        mobile: this.dataForm.regTel,
        nationality: this.dataForm.studentNation,
        parentMobile: this.dataForm.parentTel,
        parentName: this.dataForm.parentName,
        photoUrl: this.dataForm.profilePhoto.length === 0 ? '' : this.dataForm.profilePhoto[0].url.replace('data:image/jpeg;base64,',''),
        policeStation: this.dataForm.policeStation,
        politicalOutlook: this.dataForm.identity,
        registrationAddress: this.dataForm.houseAddress,
        registrationNature: this.dataForm.houseType,
        relationship: this.dataForm.relation,
        residentialType: this.dataForm.liveType,
        schoolCode: 'CANPOINTAI',
        schoolName: '全品',
        studentName: this.dataForm.studentName,
        studentSource: this.dataForm.source,
      }
      actions.applySubmit(req).then((res) => {
        if (res && res.code === 200) Toast.success('提交成功')
        this.$router.push({
          path: '/',
        })
      })
    },
  },
}
</script>
<style lang="less" scoped>
.apply {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .from-main {
    flex: 1;
    overflow-y: scroll;
  }

  .from-footer {
    height: 100px;
  }
}
</style>
