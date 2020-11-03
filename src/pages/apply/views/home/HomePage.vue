<template>
  <div class="home qui-fx-ver">
    <div class="btn">
      <van-button
        @click="routeTo('applyForm')"
        type="info"
        size="normal"
        style="width: 55%; border-radius: 8px; font-size: 16px; margin-bottom: 15px"
        color="#0084FF"
        >提交申请</van-button
      >
      <van-button
        @click="routeTo('searchForm')"
        type="info"
        size="normal"
        style="width: 55%; border-radius: 8px; font-size: 16px;"
        color="#0084FF"
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
.btn {
  position: absolute;
  top: 35%;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

@media screen and (max-width: 375px) {
  .home {
    background-image: url(../../assets/bg.png);
    background-size: 100% 100%;
  }
}
@media screen and (min-width:376px) and (max-width: 750px) {
  .home {
    background-image: url(../../assets/bg@2x.png);
    background-size: 100% 100%;
  }
}
@media screen and (min-width:751px) and (max-width: 1125px) {
  .home {
    background-image: url(../../assets/bg@3x.png);
    background-size: 100% 100%;
  }
}
</style>
