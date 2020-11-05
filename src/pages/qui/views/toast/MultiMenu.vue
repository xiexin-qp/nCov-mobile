<template>
  <div class="mutil-menu u-page u-fx-ver">
    <header-com isBack :title="$route.query.title"></header-com>
    <div class="select-list u-fx-ac u-fx-jsb u-bd-b">
      <div>请假类型：</div>
      <div @click="isShow = true" class="u-fx-f1 u-tx-r" style="color:#666">
        <multi-menu title="请假类型" :select-list="selectList" v-model="selectValue"></multi-menu>
      </div>
      <div class="rit-icon"></div>
    </div>
  </div>
</template>

<script>
import HeaderCom from '../../component/HeaderCom'
import MultiMenu from '@c/common/MultiMenu'
export default {
  name: 'MultiMenuCom',
  components: {
    MultiMenu,
    HeaderCom
  },
  data() {
    return {
      isShow: false,
      type: '请选择',
      selectValue: [],
      selectList: [
        {
          id: 1,
          title: '病假',
          children: [
            {
              id: 1.1,
              title: '感冒',
              children: [
                {
                  id: 1.11,
                  title: '传染'
                },
                {
                  id: 1.12,
                  title: '非传染传染'
                }
              ]
            },
            {
              id: 1.2,
              title: '肚子痛',
              children: [
                {
                  id: 1.21,
                  title: '传染'
                },
                {
                  id: 1.22,
                  title: '非传染'
                }
              ]
            }
          ]
        },
        {
          id: 1,
          title: '事假',
          children: [
            {
              id: 1.1,
              title: '孩子生病'
            },
            {
              id: 1.2,
              title: '出差办事'
            }
          ]
        }
      ]
    }
  },
  methods: {
    select(item) {
      this.type = item.name
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
