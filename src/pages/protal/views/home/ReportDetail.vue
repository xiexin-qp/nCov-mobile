<template>
  <div class="set qui-page qui-fx-ver">
    <header-com title="上报详情" isBack></header-com>
    <div class="qui-fx qui-fx-jsb set-info div-shadow" >
      <div class="set-img">
        <img :src="detailInfo.photoImg" alt="">
      </div>
      <div class="qui-fx-ver">
        <div class="set-name">{{detailInfo.studentName}}</div>
        <div class="set-class">{{detailInfo.className}}</div>
        <div class="set-class">ID: {{detailInfo.ID}}</div>
      </div>
      <div>
        <div class="set-heat" v-if="detailInfo.title === '发热'">
          <img :src="tempyc" style="vertical-align:sub" alt="">
          体温异常
        </div>
        <div class="set-normal" v-else>
          <img :src="tempzc" style="vertical-align:sub" alt="">
          体温正常
        </div>
      </div>
    </div>
    <div class="set-info div-shadow">
      <van-cell-group :border="false">
        <van-cell title="体温" :value="`${detailInfo.tiwen}℃(${detailInfo.title})`" :value-class="detailInfo.title==='发热'?'set-heat':'set-normal'"/>
        <van-cell title="测量部位" :value="detailInfo.part" />
        <van-cell title="是否接触疫情人员" :value="detailInfo.isContact" />
        <van-cell title="附带症状" :value="detailInfo.symptom" />
        <van-cell title="上报人" :value="detailInfo.reportName" />
        <van-cell title="上报时间" :value="detailInfo.createTime" />
        <van-cell title="其他说明" :value="detailInfo.remarks" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import img from '@a/img/detail.png'
import tempyc from '../../assets/img/tempyc.png'
import tempzc from '../../assets/img/tempzc.png'
import { Cell, CellGroup } from 'vant';
import { actions } from '../../store'

export default {
  name: 'ReportDetail',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    HeaderCom
  },
  data () {
    return {
      img,
      tempyc,
      tempzc,
      detailInfo:{
        studentName: '',
        className: '',
        ID: '',
        tiwen: '37.6',
        part: '口腔',
        isContact: '否',
        otherSymptom: '咳嗽',
        reportName: '刘家长',
        createTime: '2020-03-07',
        remarks: '没有其他症状',
        title: '发热',
        photoImg: img
      },
      id: '',
      // reportType: '',
      symptom: ''

    }
  },
  computed: {
  },
  async mounted () {
    this.id = this.$route.query.userCode
    // this.reportType = this.$route.query.reportType
    const res = await actions.reportDetail(this.id)
    this.detailInfo = res.data
    this.symptom = this.detailInfo.otherSymptom.map(item => item.name).join(',')
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.set{
  .set-info {
    margin: 15px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    .set-img {
      width: 159px;
      height: 159px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .set-name {
      font-size: 38px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    .set-class {
      font-size: 32px;
      color: #999;
      margin-top: 10px;
    }
    
  }
  .div-shadow {
    box-shadow: 2px 2px 8px #ccc;
    overflow: hidden;
  }
}

.van-cell:not(:last-child)::after{
  border-color: #dbdbdd;
}
.set-heat{
  color:#F74F5F;
}
.set-normal{
  color:#3B54F1;
}
</style>
