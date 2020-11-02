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
        studentSex: '1', // 学生性别
        studentIdCard: '', // 身份证号码
        studentNation: '汉族', // 民族
        identity: '群众', // 政治面貌
        source: '1', // 学生来源
        lastSchool: '', // 毕业学校
        applyProject: '', // 申请专业
        houseType: '1', // 户口性质
        houseAddress: '', // 户口地址
        policeStation: '', // 所属派出所
        liveType: '', // 居住类型
        address: '', // 家庭地址
        parentName: '', // 家长姓名
        parentTel: '', // 家长手机
        relation: '', // 与本人关系
        isGuardian: '1', // 是否监护人
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
      console.log(this.dataForm)
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
