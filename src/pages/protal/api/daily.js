/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let dailyApi = {
  getPersonInfo: '/daily/person#get', // 获取个人日报
  getClassInfo: '/daily/class#get', // 获取班级日报
  getMyClass: '/daily/myClass#get' // 我的班级
}

for (let val in dailyApi) {
  dailyApi[val] = `${hostEnv}${dailyApi[val]}`
}

export default dailyApi
