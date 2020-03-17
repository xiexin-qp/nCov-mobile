/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let dailyApi = {
  getPersonInfo: 'http://yapi.demo.qunar.com/mock/85606/daily/person#get', // 获取个人日报
  getClassInfo: 'http://yapi.demo.qunar.com/mock/85606/daily/class#get', // 获取班级日报
  getClassReportList: 'http://yapi.demo.qunar.com/mock/85606/daily/class#get',
  getExceDate: '/report/info/month/date#get', // 获取月份中的异常信息
  getReportList: '/report/info/list#post', // 获取个人日报
  getClassStatistics: '/report/info/submit/count#get', //按日期查询上报统计数据
  getCountDetail: '/report/info/count/detail#post', // 获取统计详细数据
  getRoleInfo: '/user/info/role/list#get', // 查询用户可切换的角色
  getMyClass: '/teacher/clazz/info#post', // 查询班主任绑定的班级
  changeMyClass: '/teacher/clazz/update#put', // 换绑班级
  getStudentsList: '/teacher/clazz/users#post' // 查询班级学生
}

for (let val in dailyApi) {
  dailyApi[val] = `${hostEnv}${dailyApi[val]}`
}

export default dailyApi
