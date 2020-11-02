<template>
  <div class="time-out">
    <Header title="入学申请" />
    <div class="close">
      <img src="../../assets/close.png" alt="" />
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
  background-color: #fff;
}
.close{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding-top: 10%;

    img {
        width: 200px;
        height: 200px;
        margin-bottom: 5%;
    }
}
</style>