<template>
  <div class="level-scroll u-page u-fx-ver">
    <date-time
      :min-date="minDate"
      :max-date="maxDate"
      type="datetime"
      :date="currentDate"
      v-model="isShow"
      @get-date="getDate"
    ></date-time>
    <header-com isBack :title="$route.query.title"></header-com>
    <div class="select-list u-fx-ac u-fx-jsb u-bd-b">
      <div>开始日期：</div>
      <div @click="changeTime('startTime')" class="u-fx-f1 u-tx-r" style="color:#666">{{ startTime }}</div>
      <div class="rit-icon"></div>
    </div>
    <div class="select-list u-fx-ac u-fx-jsb u-bd-b">
      <div>结束日期：</div>
      <div @click="changeTime('endTime')" class="u-fx-f1 u-tx-r" style="color:#666">{{ endTime }}</div>
      <div class="rit-icon"></div>
    </div>
  </div>
</template>

<script>
import HeaderCom from '../../component/HeaderCom'
import DateTime from '@c/common/DateTime'
export default {
  name: 'CalendarShowCom',
  components: {
    DateTime,
    HeaderCom
  },
  data() {
    return {
      startTime: '2019/08/14 10:10',
      endTime: '2019/08/14 10:10',
      minDate: '2018/04/05',
      maxDate: '2022/04/05',
      currentDate: '2019/08/14 10:10',
      isShow: false
    }
  },
  mounted() {},
  methods: {
    getDate(date) {
      this[this.tag] = date
    },
    changeTime(tag) {
      this.isShow = true
      this.tag = tag
      this.currentDate = this[tag]
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
