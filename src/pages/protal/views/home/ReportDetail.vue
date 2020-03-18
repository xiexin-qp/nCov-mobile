<template>
  <div class="set qui-page qui-fx-ver">
    <header-com title="上报详情" isBack></header-com>
    <div class="qui-fx qui-fx-jsb set-info div-shadow" >
      <div class="set-img">
        <img :src="detailInfo.profilePhoto ? detailInfo.profilePhoto : img" alt="">
      </div>
      <div class="qui-fx-ver">
        <div class="set-name">{{detailInfo.userName}}</div>
        <div class="set-class">{{detailInfo.className}}</div>
        <div class="set-class">ID: {{detailInfo.userCode}}</div>
      </div>
      <div>
        <div class="set-heat" v-if="detailInfo.feverMark === '1'">
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
        <van-cell 
          title="体温"
          :value="`${detailInfo.temperature}℃(${detailInfo.feverMark === '1' ? '发热' : '正常' })`" 
          :value-class="detailInfo.feverMark === '1'?'set-heat':'set-normal'"/>
        <van-cell title="测量部位" :value="detailInfo.bodyPartsName" />
        <van-cell title="是否接触疫情人员" :value="detailInfo.mark01 === '1' ? '是' : '否'" />
        <van-cell title="附带症状" :value="detailInfo.symptomsName ? detailInfo.symptomsName : '暂无'" />
        <van-cell title="上报人" :value="detailInfo.reportPersonName" />
        <van-cell title="上报时间" :value="detailInfo.reportTime" />
        <van-cell title="其他说明" :value="detailInfo.symptomsRemarks ? detailInfo.symptomsRemarks : '暂无'" />
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
      detailInfo:{ },
      id: ''
    }
  },
  async mounted () {
    this.id = this.$route.query.id
    const res = await actions.reportDetail(this.id)
    this.detailInfo = res.result
    this.detailInfo.reportTime = this.$tools.gmtToDate(this.detailInfo.reportTime)
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
