<template>
  <div class="u-page u-fx-ver">
    <header-com :title="title"></header-com>
    <div class="u-fx-f1 u-fx">
      <div class="slide-menu">
        <ul>
          <li
            @click="changeMenu(index)"
            :class="['u-bd-b slide-li', { act: currentIndex === index }]"
            v-for="(menu, index) in slideList"
            :key="index"
          >
            {{ menu }}
          </li>
        </ul>
      </div>
      <div class="u-fx-f1 menu-list">
        <ul>
          <li
            @click="goDemo(list.path, list.title)"
            class="u-fx-jsb u-fx-ac u-bd-b"
            v-for="(list, index) in menuList[currentIndex]"
            :key="index"
          >
            <div class="u-fx-f1">{{ list.title }}</div>
            <div style="font-size: 12px; color:#666;marign-right: 4px">{{ list.author }}</div>
            <img src="../../assets/img/right.png" class="rit-img" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Toast from '../../router/toast.js'
import Scroll from '../../router/scroll.js'
import DateTime from '../../router/date.js'
import Menu from '../../router/menu.js'
import Data from '../../router/data.js'
import Form from '../../router/form.js'
import Upload from '../../router/upload.js'
import Echarts from '../../router/echarts.js'
import Collapse from '../../router/collapse.js'
import HeaderCom from '../../component/HeaderCom'

export default {
  name: 'Home',
  components: {
    HeaderCom
  },
  data() {
    return {
      slideList: ['弹出层', '滑动滚动', '日历日期', '菜单栏', '表单', '数据', '文件上传', '图表', '折叠面板'],
      title: 'Qui组件',
      currentIndex: 0,
      menuList: [Toast, Scroll, DateTime, Menu, Form, Data, Upload, Echarts, Collapse]
    }
  },
  methods: {
    changeMenu(index) {
      this.currentIndex = index
    },
    goDemo(path, title) {
      this.$router.push({
        path: `/${path}`,
        query: {
          title
        }
      })
    }
  },
  mounted() {}
}
</script>

<style lang="less">
.slide-menu {
  width: 200px;
  li {
    height: 90px;
    text-indent: 30px;
    line-height: 90px;
    border-left: 8px #f5f5f5 solid;
  }
  .act {
    background-color: #fff;
    color: @u-type-primary;
    border-left: 8px @u-type-primary solid;
  }
}
.menu-list {
  background-color: #fff;
  li {
    color: @u-content-color;
    padding: 0 20px;
    height: 90px;
    line-height: 90px;
  }
  .rit-img {
    width: 26px;
    height: 26px;
    display: block;
  }
}
</style>
