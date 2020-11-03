<template>
  <div class="time-out">
    <Header title="入学申请" />
    <div class="close">
      <img src="../../assets/yiguoqi.png" alt="" />
      <span>招生已过期，请联系校方相关人员</span>
    </div>
  </div>
</template>

<script>
import Header from '../../component/Header'
export default {
  data() {
    return {}
  },
  components: {
    Header,
  },
}
</script>

<style lang="less" scoped>
.time-out {
  height: 100vh;
  background-color: #f4f7fc;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.close {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 40%;
  box-sizing: border-box;
  color: #666666;

  img {
    width: 260px;
    height: 240px;
    margin-bottom: 6%;
  }
}
</style>