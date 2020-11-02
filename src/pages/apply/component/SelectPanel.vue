<template>
  <van-popup
    position="right"
    v-model="selectTag"
    :style="{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }"
  >
    <div class="head">
      <div class="back" @click="onClickLeft">
        <img src="../assets/back.png" alt="" />
      </div>
      <span class="title"> {{ title }}</span>
    </div>
    <div class="list">
      <div class="list-item" @click="onConfirm(item)" v-for="item in selectList" :key="item.id">
        {{ item.text }}
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: 'SelectPanel',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '请选择',
    },
    selectList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {
    selectTag: {
      get() {
        return this.value
      },
      set() {
        this.$emit('input', false)
      },
    },
  },
  methods: {
    onConfirm(item) {
      this.$emit('input', false)
      this.$emit('confirm', item)
    },
    onClickLeft() {
      this.$emit('input', false)
    },
  },
}
</script>
<style lang="less" scoped>
.head {
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
.list {
  flex: 1;
  overflow-y: scroll;
  padding: 10px 0;
  .list-item {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid rgb(241, 238, 238);
    padding: 0 15px;
    box-sizing: border-box;
    color: #333;
  }
}
</style>
