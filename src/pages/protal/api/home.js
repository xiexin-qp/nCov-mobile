/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let homeApi = {
  addReport: '/report/info/submit#post', // 疫情上报
  reportDetail: '/report/info/one/#getWithPara', // 疫情记录详情
  getBody: '/operate/bodypartsinfo/list#get', // 测量部位
  getSymptoms: '/operate/symptomsinfo/list#get', // 附带症状
  teacherGetStudent: '/teacher/clazz/users#post', // 班级下的学生
  getUser: '/school/userinfo/getUserInfoList#post' // 班级下的学生
}

for (let val in homeApi) {
  homeApi[val] = `/zhuxu${homeApi[val]}`
}

export default homeApi
