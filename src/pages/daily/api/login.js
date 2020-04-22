/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let loginApi = {
  getYzm: '/user/auth/code#get', // 获取验证码
  login: '/user/login#get', // 登录
  getUserInfo: '/user/one#getUrl', // 根据用户code查询详情
  getGradeInfo: '/user/info#getUrl#false' // 根据usercode查询用户信息
}

for (let val in loginApi) {
  loginApi[val] = `${hostEnv.zhuxu}${loginApi[val]}`
}

export default loginApi
