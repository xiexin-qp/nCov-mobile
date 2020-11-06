<template>
  <div class="my-list">
    <Header title="我的申请" />
    <div class="list-area">
      <div
        class="list-item"
        :style="{ borderLeftColor: getStatus(item.state)[1] }"
        v-for="item in applyList"
        :key="item.id"
        @click="toDetails(item)"
      >
        <div class="apply-user">
          <div class="apply-left">
            <div class="user-name">
              <img :src="getStatus(item.state)[0]" alt="" />
              <span> {{ item.studentName }} </span>
            </div>
            <div class="project-name">{{ item.majorName }}</div>
            <div class="apply-time">{{ getTime(item.createTime) }}</div>
          </div>
          <div class="apply-right">
            <span
              :style="{ background: getStatus(item.state)[2], color: getStatus(item.state)[1] }"
              class="status-block"
              >{{ getStatus(item.state)[3] }}</span
            >
          </div>
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
  mounted() {
    const list = JSON.parse(sessionStorage.getItem('applyList'))
    this.applyList = list || []
  },
  methods: {
    toDetails(item) {
      this.$router.push({
        path: `/applyDetails`,
        query: { id: item.id },
      })
    },
    getStatus(status) {
      return this.$getStatus(status)
    },
    getTime(time) {
      return this.$tools.gmtToDate(time)
    },
  },
}
</script>

<style lang="less" scoped>
.my-list {
  height: 100vh;
  background-color: #f4f7fc;
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
  background-color: #fff;
  border-left: 6px solid rgb(224, 41, 41);
  height: 250px;
  margin-bottom: 25px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.117647), 0 -3px 4px rgba(0, 0, 0, 0.117647);

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
        color: #999;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          width: 31px;
          height: 31px;
          margin-right: 10px;
          border-radius: 50%;
        }
      }
      .project-name {
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding: 0 20px;
        color: #333;
        font-size: 36px;
        font-weight: bolder;
        font-family: PingFang SC;
      }
      .apply-time {
        color: #999;
        box-sizing: border-box;
        padding: 0 20px;
        font-size: 14px;
      }
    }
    .apply-right {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .status-block {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 70px;
        border-radius: 35px;
        font-size: 28px;
        font-weight: bold;
      }
    }
  }
}
</style>