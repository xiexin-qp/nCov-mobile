/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let dailyApi = {
  getReportList: 'http://39.97.164.4:8090/reportList/#get', // 获取个人日报
  getMyClass: 'http://yapi.demo.qunar.com/mock/85606/daily/myClass#get' // 我的班级
}

for (let val in dailyApi) {
  dailyApi[val] = `${hostEnv}${dailyApi[val]}`
}

export default dailyApi
