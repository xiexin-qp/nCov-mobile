/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let homeApi = {
  getYzm: '/user/auth/code#get', // 获取验证码
  login: '/user/login#get', // 登录
  getUserInfo: '/user/info#getUrl', // 根据用户code查询详情
  addReport: '/report/info/submit#post', // 疫情上报
  reportDetail: '/report/info/one/#getWithPara' // 疫情记录详情
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv}${homeApi[val]}`
}

export default homeApi
