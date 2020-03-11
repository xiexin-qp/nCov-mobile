/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let homeApi = {
  login: 'http://39.97.164.4:8090/login#post', // 登录
  getIndex: 'http://yapi.demo.qunar.com/mock/5691/getDemoList#get', // 获取列表
  getDetail: 'http://yapi.demo.qunar.com/mock/5691/getDemoInfo#get', // 获取详情
  getReportDetail: '/report/detail#get', // 获取详情
  getStudent: '/daily/myClass#get', // 获取详情
  studentReport: 'http://39.97.164.4:8090/studentReport#post', // 学生上报
  teacherReport: 'http://39.97.164.4:8090/teacherReport#post', // 教职工上报
  getStudentList: 'http://39.97.164.4:8090/studentList#get', // 学生列表
  // http://39.97.164.4:8090/studentList?gradeId=g1&classId=a1
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv}${homeApi[val]}`
}

export default homeApi
