<template>
  <div class="home qui-fx-ver">
    <div class="bg-img">
      <img src="../../assets/bg.jpg" alt="" />
    </div>
    <div class="btn">
      <van-button @click="routeTo('applyForm')" type="info" size="normal" style="width: 30%; border-radius: 8px" color="rgba(22, 155, 213, 1)"
        >提交申请</van-button
      >
      <van-button @click="routeTo('searchForm')" type="info" size="normal" style="width: 30%; border-radius: 8px" color="rgba(22, 155, 213, 1)"
        >查看进度</van-button
      >
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'HomePage',
  computed: {},
  data() {
    return {
      moment,
      minDate: new Date(),
      maxDate: new Date(2030, 1, 1),
    }
  },
  mounted() {},
  methods: {
    routeTo(path) {
      this.$router.push({
        path: `/${path}`,
      })

      // this.$router.push({
      //   path: `/timeOut`,
      // })
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  position: relative;
}
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1;

  img {
    display: block;
    width: 100%;
    height: 100;
  }
}
.btn {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 2;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
