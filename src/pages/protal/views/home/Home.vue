<template>
  <div class="home qui-page qui-fx-ver">
    <div class="top qui-fx-jsb qui-fx-ac">
      <div class="table">
        <van-tabs
          v-if="userInfo.roleCode === 'BZR' || userInfo.roleCode === 'XY'"
          type="card"
          v-model="role"
          color="rgb(59,84,241)"
        >
          <van-tab title="我的" name="1"></van-tab>
          <van-tab :title="userInfo.roleCode === 'BZR' ? '班级' : '学校'" name="2"></van-tab>
        </van-tabs>
      </div>
      <div class="set qui-fx-ac" @click="goPersonal">
        <img
          :src="userInfo.profilePhoto ? userInfo.profilePhoto : errorImg"
          alt
          :onerror="errorImg"
        />
        <span>{{ userInfo.userName }}</span>
      </div>
    </div>
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
      <div class="title qui-fx-jsb" v-if="role === '1'">
        <span>今日上报</span>
        <span @click="nowReport(1)">立即上报</span>
      </div>
      <div v-else class="title qui-fx-jsb">
        <span>今日上报情况</span>
        <!-- <span @click="nowReport(2)">立即上报</span> -->
        <span class="num">学生共{{ total ? total : 0 }}人</span>
      </div>
      <div class="list" v-if="role === '1'">
        <ul v-if="personList.length > 0">
          <li
            :class="item.mark02 === '1' ? 'warn' : 'normal'"
            v-for="(item,i) in personList"
            :key="i"
          >
            <div class="info qui-fx-jsb">
              <div class="qui-fx-ver">
                <span>测温：{{ item.bodyPartsName }} {{ item.temperature }}</span>
                <span>症状：{{ item.symptomsName ? item.symptomsName : '暂无'}}</span>
              </div>
              <span class="detail" @click="reportDetail(item)">查看详情</span>
            </div>
            <div class="date">
              <span>{{ gmtToDate(item.reportTime,'3') }}</span>
            </div>
          </li>
        </ul>
        <no-data v-else msg="没有数据~"></no-data>
      </div>
      <div class="report qui-fx-ver" v-else>
        <div class="gather qui-fx-jsa">
          <div class="unappear" @click="countDetail(0)">
            <div class="data qui-fx-ver">
              <span>{{ unappearNum ? unappearNum : 0 }}</span>
              <span>未上报</span>
            </div>
          </div>
          <div class="unusual" @click="countDetail(1)">
            <div class="data qui-fx-ver">
              <span>{{ unusualNum ? unusualNum : 0 }}</span>
              <span>异常</span>
            </div>
          </div>
          <div class="fever" @click="countDetail(2)">
            <div class="data qui-fx-ver">
              <span>{{ feverNum ? feverNum : 0 }}</span>
              <span>发热</span>
            </div>
          </div>
        </div>
        <div class="student-list">
          <ul v-if="collectLIst.length>0">
            <li
              class="qui-fx-jsb qui-fx-ac"
              v-for="(item, i) in collectLIst"
              :key="i"
              @click="reportDetail(item)"
            >
              <div class="student qui-fx-ac">
                <img :src="item.photoImg ? item.photoImg : errorImg" alt :onerror="errorImg" />
                <span>{{ item.userName }}</span>
              </div>
              <span>{{ item.reportState === 2 ? '未上报' : ''}}</span>
              <span>{{ item.health === 2 ? '异常' : ''}}</span>
              <span>{{ item.feverMark === 1 ? '发热' : ''}}</span>
            </li>
          </ul>
          <no-data v-else msg="没有数据~"></no-data>
        </div>
      </div>
    </scroll-list>
  </div>
</template>

<script>
import warnImg from '@a/img/warnImg.png'
import normalImg from '@a/img/normalImg.png'
import CalendarShow from '@com/CalendarShow'
import ScrollList from '@com/ScrollList'
import NoData from '@c/common/NoData'
import { store, actions, setStore } from '../../store'
export default {
  name: 'Home',
  components: {
    CalendarShow,
    ScrollList,
    NoData
  },
  computed: {
    userInfo: () => store.userInfo
  },
  data() {
    return {
      errorImg: 'this.src="' + require('@a/img/photo.png') + '"',
      normalImg,
      warnImg,
      personList: [],
      collectLIst: [],
      unappearNum: 0,
      unusualNum: 0,
      feverNum: 0,
      total: 0,
      role: '1',
      userType: '1',
      cutTag: true,
      exceptionList: [],
      zcList: [],
      studentInfoList: [],
      otherSymptom: '',
      today: ''
    }
  },
  watch: {
    role(val) {
      console.log(this.today)
      if (val === '1') {
        this.exceDate(1, this.gmtToDate(new Date(), '2'))
        if (typeof this.today === 'string') {
          this.today = this.today.split('-')[0] + '/' + this.today.split('-')[1] + '/' + this.today.split('-')[2]
        }
        this.showList(false, new Date(this.today).getTime() / 1000)
      } else {
        this.getStatistics(this.gmtToDate(this.today))
        this.countDetail(0, false)
        this.exceDate(2, this.gmtToDate(new Date(), '2'))
      }
    }
  },
  created() {},
  async mounted() {
    this.today = new Date()
    this.showList(false, this.today.getTime() / 1000)
    this.exceDate(1, this.gmtToDate(new Date(), '2'))
    if (this.userInfo.roleCode === 'JZ') {
      const res = await actions.getGradeInfo(this.userInfo.studentCode)
      setStore({
        key: 'userInfo',
        data: {
          ...this.userInfo,
          gradeCode: res.result.gradeCode,
          gradeName: res.result.gradeName,
          clazzCode: res.result.classCode,
          clazzName: res.result.className
        }
      })
    }
  },
  methods: {
    // 时间转化
    gmtToDate(t, type = '1') {
      if (t.indexOf('.000+0000') > -1) {
        return t.replace('T', ' ').replace('.000+0000', '')
      }
      let d = new Date(t)
      let date = ''
      if (type === '1') {
        date =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
          '-' +
          (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
      } else if (type === '2') {
        date = d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1))
      } else if (type === '3') {
        date =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
          '-' +
          (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
          ' ' +
          (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
          ':' +
          (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
          ':' +
          (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      }
      return date
    },
    //当月异常日期
    async exceDate(type, monthDate) {
      this.exceptionList = []
      const req = {
        schoolCode: this.userInfo.schoolCode,
        monthDate
      }
      if (type === 2) {
        req.clazzCode = this.userInfo.clazzCode
      } else {
        if(this.userInfo.roleCode === 'JZ'){
          req.userCode = this.userInfo.studentCode
        }else{
          req.userCode = this.userInfo.userCode
        } 
      }
      const res = await actions.getExceDate(req)
      res.result.forEach(ele => {
        this.exceptionList.push(parseInt(ele.split('-')[2]))
      })
    },
    //个人上报信息
    async showList(tag = false, queryDate) {
      const req = {
        schoolCode: this.userInfo.schoolCode,
        queryDate
      }
      if (this.userInfo.roleCode === 'JZ') {
        req.userCode = this.userInfo.studentCode
      } else {
        req.userCode = this.userInfo.userCode
      }
      const res = await actions.getReportList(req)
      if (tag) {
        // 加载下一页
        if (res.result.length === 0) {
          this.$notify('数据加载完毕')
          return
        }
        this.personList = this.personList.concat(res.data)
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      } else {
        this.personList = []
        if (res.result.length === 0) {
          return
        }
        this.personList = res.result
        this.$refs.scroll.init(this.personList)
      }
    },
    // 按日期查询上报统计详情
    async countDetail(type = 0, tag = false) {
      this.collectLIst = []
      const req = {
        schoolCode: this.userInfo.schoolCode,
        pageNum: 1,
        pageSize: 9999,
        date: this.gmtToDate(this.today)
      }
      if (this.userInfo.roleCode === 'BZR') {
        req.clazzCode = this.userInfo.clazzCode
      }
      if (type === 0) {
        req.reportState = 2
      } else if (type === 1) {
        req.health = 2
      } else if (type === 2) {
        req.feverMark = 1
      }
      const res = await actions.getCountDetail(req)
      if (tag) {
        // 加载下一页
        if (res.result.length === 0) {
          this.$notify('数据加载完毕')
          return
        }
        this.collectLIst = this.collectLIst.concat(res.result.list)
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      } else {
        if (res.result.length === 0) {
          return
        }
        this.collectLIst = res.result.list
        this.$refs.scroll.init(this.collectLIst)
      }
    },
    // 按日期查询上报统计数据
    async getStatistics(date) {
      const req = {
        clazzCode: this.userInfo.clazzCode,
        schoolCode: this.userInfo.schoolCode,
        date
      }
      const res = await actions.getClassStatistics(req)
      this.total = res.result.submitSum
      this.unappearNum = res.result.noSubmitSum
      this.unusualNum = res.result.excSum
      this.feverNum = res.result.feverSum
    },
    getDate(date) {
      console.log(date)
      if (this.role === '2') {
        this.today =
          date.year +
          '-' +
          (date.month > 9 ? date.month : '0' + date.month) +
          '-' +
          (date.day > 9 ? date.day : '0' + date.day)
      } else {
        this.today = new Date(
          date.year +
            '/' +
            (date.month > 9 ? date.month : '0' + date.month) +
            '/' +
            (date.day > 9 ? date.day : '0' + date.day)
        )
      }
      let month = date.year + '-' + (date.month > 9 ? date.month : '0' + date.month)
      if (this.role === '1') {
        this.showList(false, new Date(this.today).getTime() / 1000)
        // this.exceDate(1, month)
      } else {
        this.countDetail(0, false)
        this.getStatistics(this.today)
        this.exceDate(2, month)
      }
    },
    goPersonal() {
      this.$router.push('/personal')
    },
    nowReport() {
      this.$router.push('/addReport')
    },
    reportDetail(record) {
      console.log(record.id)
      const query = {
        id: record.id
      }
      this.$router.push({ path: '/reportDetail', query })
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
            color: #666;
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
</style>
db.createUser({user:'canpoint',pwd:'canpoint',roles:[{role:'readWrite',db:'canpoint'}]})
