<template>
  <div class="set qui-page qui-fx-ver">
    <header-com title="上报详情" isBack></header-com>
    <div class="qui-fx qui-fx-jsb set-info div-shadow" >
      <div class="set-img">
        <img :src="img" alt="">
      </div>
      <div class="qui-fx-ver">
        <div class="set-name">{{userInfo.name}}</div>
        <div class="set-class">{{userInfo.class}}</div>
        <div class="set-class">ID: {{userInfo.id}}</div>
      </div>
      <div class="set-state">
        <img :src="tempyc" style="vertical-align:sub" alt="">
        体温异常
      </div>
    </div>
    <div class="set-info div-shadow">
      <van-cell-group :border="false">
        <van-cell title="体温" :value="`${detailInfo.temp}℃${detailInfo.title}`" value-class="value-class"/>
        <van-cell title="测量部位" :value="detailInfo.part" />
        <van-cell title="是否接触疫情人员" :value="detailInfo.isState" />
        <van-cell title="附带症状" :value="detailInfo.symptom" />
        <van-cell title="上报人" :value="detailInfo.name" />
        <van-cell title="上报时间" :value="detailInfo.time" />
        <van-cell title="其他说明" :value="detailInfo.remark" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import img from '@a/img/detail.png'
import tempyc from '@a/img/tempyc.png'
import { Cell, CellGroup } from 'vant';
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
      userInfo:{
        name:'刘丽',
        class:'高一六班',
        id:'31234312'
      },
      detailInfo:{
        temp:'37.6',
        part:'口腔',
        isState:'否',
        symptom:'咳嗽',
        name:'刘家长',
        time:'2020-03-07',
        remark:'没有其他症状',
        title:'(发热)'
      }
    }
  },
  computed: {
  },
  mounted () {
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
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
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
    .set-state{
      color:#F74F5F;
      font-size: 28px;
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
.value-class{
  color: red;
}
</style>
