<template>
  <div class="select-data u-page u-fx-ver">
    <select-data title="请假类型" :select-list="selectList" v-model="isShow" @confirm="confirm"></select-data>
    <header-com isBack :title="$route.query.title"></header-com>
    <div class="select-list u-fx-ac u-fx-jsb u-bd-b">
      <div>请假类型：</div>
      <div @click="isShow = true" class="u-fx-f1 u-tx-r" style="color:#666">{{ type }}</div>
      <div class="rit-icon"></div>
    </div>
  </div>
</template>

<script>
import HeaderCom from '../../component/HeaderCom'
import SelectData from '@c/common/SelectData'
export default {
  name: 'SelectDataCom',
  components: {
    SelectData,
    HeaderCom
  },
  data() {
    return {
      isShow: false,
      type: '请选择',
      selectList: [
        {
          id: '1',
          text: '年假'
        },
        {
          id: '2',
          text: '事假'
        },
        {
          id: '3',
          text: '婚假'
        }
      ]
    }
  },
  methods: {
    confirm(item) {
      this.type = item.text
    }
  }
}
</script>

<style lang="less" scoped>
.select-list {
  background-color: #fff;
  padding: 30px 20px;
}
</style>
