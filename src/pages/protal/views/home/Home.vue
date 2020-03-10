<template>
  <div class="home qui-page qui-fx-ver">
    <div class="top qui-fx-jsb qui-fx-ac">
      <div class="table">
        <van-tabs v-if="true" type="card" v-model="role" color="rgb(59,84,241)">
          <van-tab title="我的" name="me"> </van-tab>
          <van-tab :title="title" name="other"> </van-tab>
        </van-tabs>
      </div>
      <div class="set qui-fx-ac" @click="goPersonal">
        <img src="" alt="" :onerror="errorImg" />
        <span>{{ userName }}</span>
      </div>
    </div>
    <div class="main qui-fx-ver">
      <scroll-list ref="scroll" pullUpLoad>
        <div class="calendar qui-fx-ver">
          <div class="sub-title qui-fx-jsb">
            <span>武汉加油！中国加油</span>
            <span>全品与你共克时艰</span>
          </div>
          <calendar-show
            :exception-list="exceptionList"
            :zc-list="zcList"
            ref="calendar"
            @get-date="getDate"
          ></calendar-show>
        </div>
        <div v-if="role === 'me'" class="title qui-fx-jsb">
          <span>今日上报</span>
          <span @click="nowReport">立即上报</span>
        </div>
        <div v-else class="title qui-fx-jsb">
          <span>今日上报情况<span class="num">（学生共36人）</span></span>
          <span @click="nowReport">立即上报</span>
        </div>
        <div class="list" v-if="role === 'me'">
          <ul>
            <li class="warn" @click="reportDetail">
              <div class="info qui-fx-jsb">
                <div class="qui-fx-ver">
                  <span>测温：腋下38.5</span>
                  <span>症状：发烧，咳嗽</span>
                </div>
                <span class="detail">查看详情</span>
              </div>
              <div class="date">
                <span>2020-02-01 09:00:00</span>
              </div>
            </li>
            <li class="normal">
              <div class="info qui-fx-jsb">
                <div class="qui-fx-ver">
                  <span>测温：腋下38.5</span>
                  <span>症状：发烧，咳嗽</span>
                </div>
                <span class="detail">查看详情</span>
              </div>
              <div class="date">
                <span>2020-02-01 09:00:00</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="report qui-fx-ver" v-else>
          <div class="gather qui-fx-jsa">
            <div class="unappear" @click="getStudentCase(0)">
              <div class="data qui-fx-ver">
                <span>5</span>
                <span>未上报</span>
              </div>
            </div>
            <div class="unusual" @click="getStudentCase(1)">
              <div class="data qui-fx-ver">
                <span>5</span>
                <span>异常</span>
              </div>
            </div>
            <div class="fever" @click="getStudentCase(2)">
              <div class="data qui-fx-ver">
                <span>5</span>
                <span>发热</span>
              </div>
            </div>
          </div>
          <div class="student-list">
            <ul>
              <li class="qui-fx-jsb qui-fx-ac" v-for="(item, i) in 10" :key="i">
                <div class="student qui-fx-ac">
                  <img src="" alt="" :onerror="errorImg" />
                  <span>李斯特</span>
                </div>
                <span>未上报</span>
              </li>
            </ul>
          </div>
        </div>
      </scroll-list>
    </div>
  </div>
</template>

<script>
import warnImg from '@a/img/warnImg.png'
import normalImg from '@a/img/normalImg.png'
import CalendarShow from '@com/CalendarShow'
import ScrollList from '@com/ScrollList'
import { store, actions } from '../../store'
export default {
  name: 'Home',
  components: {
    CalendarShow,
    ScrollList
  },
  computed: {
    count: () => store.count
  },
  data() {
    return {
      errorImg: 'this.src="' + require('@a/img/photo.png') + '"',
      normalImg,
      warnImg,
      dataList: [],
      title: '班级',
      userName: '朱旭',
      role: 'me',
      cutTag: true,
      exceptionList: [1, 2, 3, 4],
      zcList: [10, 12, 14],
      studentInfoList: []
    }
  },
  watch: {
    role(val) {
      console.log(val)
    }
  },
  created() {
    this.title = '班级'
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
    getStudentCase(type) {
      //0:未上报，1：异常，2：发热
      console.log(type)
    },
    getDate(date, type) {
      console.log(date, type)
    },
    goPersonal() {
      this.$router.push('/personal')
    },
    nowReport() {
      // this.$router.push('/addReport')
      this.$router.push({
        query: {
          id: this.role
        },
        path: '/addReport'
      })
    },
    reportDetail() {
      this.$router.push('/reportDetail')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  background: #fff;
  .data-list {
    background-color: #fff;
    padding: 20px 10px;
  }
  .top {
    margin: 20px 0;
    .table {
      width: 400px;
    }
    .set {
      margin-right: 30px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin-right: 20px;
      }
      span {
        font-size: 34px;
      }
    }
  }
  .main {
    .calendar {
      padding: 20px;
      margin: 0 20px;
      background: #e5ecff;
      border-radius: 20px;
      .sub-title {
        color: #aeb9f9;
        margin: 0 20px 20px 20px;
        span {
          font-size: 28px;
        }
      }
    }
    .title {
      margin: 30px 20px 20px 20px;
      font-weight: bold;
      span:nth-child(1) {
        font-size: 34px;
        .num {
          color: rgb(59, 84, 241);
          font-weight: 100;
          font-size: 28px;
        }
      }
      span:nth-child(2) {
        font-size: 28px;
        color: rgb(59, 84, 241);
      }
    }
    .list {
      li {
        width: calc(100% - 20px);
        height: 246px;
        margin: 20px 10px;
        .info {
          padding: 40px 40px 0 28%;
          div {
            span {
              margin-bottom: 10px;
            }
          }
        }
        .date {
          margin: 20px 40px 0 28%;
          padding-top: 20px;
          border-top: 1px solid #ccc;
        }
      }
      li.warn {
        background: url('../../assets/img/warnImg.png') no-repeat;
        background-size: 100% 246px;
        span.detail {
          color: rgb(247, 79, 95);
        }
      }
      li.normal {
        background: url('../../assets/img/normalImg.png') no-repeat;
        background-size: 100% 246px;
        span.detail {
          color: rgb(59, 84, 241);
        }
      }
    }
    .report {
      margin: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 2px 2px 1px 1px #ddd;
      .gather {
        margin: 30px 20px 0 20px;
        .unappear,
        .unusual,
        .fever {
          width: 218px;
          height: 146px;
          .data {
            margin: 30px 20px 0 50%;
            text-align: center;
            font-weight: bold;
            span:nth-child(1) {
              font-size: 34px;
            }
            span:nth-child(2) {
              font-size: 28px;
            }
          }
        }
        .unappear {
          background: url('../../assets/img/unappear.png') no-repeat;
          background-size: 218px 146px;
          .data {
            margin-left: 40%;
            span {
              color: #831e83;
            }
          }
        }
        .unusual {
          background: url('../../assets/img/unusual.png') no-repeat;
          background-size: 218px 146px;
          .data {
            span {
              color: #ffae00;
            }
          }
        }
        .fever {
          background: url('../../assets/img/fever.png') no-repeat;
          background-size: 218px 146px;
          .data {
            span {
              color: #f2283a;
            }
          }
        }
      }
      .student-list {
        margin: 0 30px;
        li {
          border-bottom: 1px solid #ddd;
          padding: 30px 0;
          img {
            width: 88px;
            height: 88px;
            border-radius: 100%;
            margin-right: 20px;
          }
        }
        li:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
db.createUser({user:'canpoint',pwd:'canpoint',roles:[{role:'readWrite',db:'canpoint'}]})
