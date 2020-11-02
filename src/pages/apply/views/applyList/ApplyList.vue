<template>
  <div class="my-list">
    <Header title="我的申请" />
    <div class="list-area">
      <div class="list-item" v-for="item in 10" :key="item" @click="toDetails(item)">
        <div class="project-name">化工专业</div>
        <div class="apply-user">
          <div class="apply-left">
            <div class="user-name">张学良</div>
            <div class="apply-time">2020-11-01 14:30:55</div>
          </div>
          <div class="apply-right">申请失败</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../../component/Header'
export default {
  data() {
    return {
      applyList: [],
    }
  },
  components: {
    Header,
  },
  methods: {
    toDetails() {
      this.$router.push({
        path: `/applyDetails`,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.my-list {
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.list-area {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
}
.list-item {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid #ccc;
  height: 200px;
  margin-bottom: 25px;

  .project-name {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    color: #999;
    border-bottom: 1px solid rgba(179, 177, 177, 0.3);
  }
  .apply-user {
    display: flex;
    flex: 1;
    box-sizing: border-box;
    padding: 10px 20px;

    .apply-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;

      .user-name {
        font-size: 30px;
        color: #333;
      }
      .apply-time {
        color: #999;
      }
    }
    .apply-right {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #999;
    }
  }
}
</style>