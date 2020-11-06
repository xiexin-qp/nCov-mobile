/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let applyApi = {
  applySubmit: '/recruitStudentInfo/add/mobile#post', // 申请提交
  getApplyDetails: '/recruitStudentInfo/info/mobile#getUrl', // 获取申请详情
  getApplyList: '/recruitStudentInfo/list/mobile#post', // 查询验证
  getCode: '/sms/valid/code#getUrl' // 获取短信验证码
}

let baseApi = {
  getSubjectList : '/class/manage/query/subject/by/grade#get', // 获取专业列表
}

for (let val in applyApi) {
  applyApi[val] = `${hostEnv.wq_school}${applyApi[val]}`
}

for (let val in baseApi) {
  baseApi[val] = `${hostEnv.ljj_high}${baseApi[val]}`
}

let homeApi = {
  ...applyApi,
  ...baseApi
}

export default homeApi
