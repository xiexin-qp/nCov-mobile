<template>
  <div class="header-con">
    <div class="back" @click="routeTo">
      <img src="../assets/back.png" alt="" />
    </div>
    <span class="title"> {{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  methods: {
    routeTo() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.header-con {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: rgb(54, 74, 90);
  font-size: 32px;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
    img {
      width: 50px;
      height: 40px;
    }
  }

  .title {
    color: #fff;
  }
}
</style>