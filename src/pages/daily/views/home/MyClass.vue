<template>
  <div class="my-class qui-page qui-fx-ver">
    <header-com title="我的班级" isBack></header-com>
    <div class="info qui-fx-jsa">
      <div class="data qui-fx-ver">
        <span>班级</span>
        <span>高一（1）班</span>
      </div>
      <div class="data qui-fx-ver">
        <span>人数</span>
        <span>36</span>
      </div>
      <div class="data qui-fx-ver">
        <span>已加入</span>
        <span>30</span>
      </div>
    </div>
    <scroll-list ref="scroll" pullUpLoad>
      <div class="student-list qui-fx-ver">
        <ul>
          <li class="qui-fx-jsb qui-fx-ac" v-for="(item,i) in 10" :key="i">
            <div class="student qui-fx-ac">
              <img src="" alt="" :onerror="errorImg">
              <span>李斯特</span>
            </div>
            <span>2020-03-19 09:00:00</span>
          </li>
        </ul>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import HeaderCom from '@com/HeaderCom'
import ScrollList from '@com/ScrollList'
import { store, actions } from '../../store'
export default {
  name: 'MyClass',
  components: {
    HeaderCom,
    ScrollList
  },
  computed: {
    count: () => store.count
  },
  data() {
    return { 
      detail: {},
      errorImg: 'this.src="' + require('@a/img/photo.png') + '"', 
      }
  },
  async mounted() {
    this.showList()
  },
  methods: {
    async showList(tag = false) {
      const res = await actions.getIndex()
      if (tag) {
        // 加载下一页
        if (res.data.length === 0) {
          this.$notify('数据加载完毕')
          return
        }
        this.dataList = this.dataList.concat(res.data)
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      } else {
        this.dataList = res.data
        this.$refs.scroll.init(this.dataList)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.my-class {
  .info{
    margin: 20px;
    border:1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 1px 1px #ddd;
    .data{
      margin:30px 0;
      text-align: center;
      width: 33%;
      border-right:2px solid #ccc;
      span:nth-child(1){
        font-size:38px;
        margin-bottom: 10px;
      }
      span:nth-child(2){
        font-size:32px;
        color: rgb(59, 84, 241);
      }
    }
    .data:last-child{
      border-right: none;
      span:nth-child(2){
        color: rgb(153, 153, 153);
      }
    }
  }
  .student-list{
    padding:0 30px;
    li{
      border-bottom: 1px solid #ddd;
      padding: 30px 0;
      img{
        width:88px;
        height:88px;
        border-radius: 100%;
        margin-right: 20px;
      }
    }
    li:last-child{
      border-bottom: none;
    }
  }
}
</style>
