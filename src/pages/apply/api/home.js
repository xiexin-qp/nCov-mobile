/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let visitorApi = {
  verifUser: '/visitor/info/rescode#get', // 验证被访用户
  getCauseList: '/cause/info/list#post', // 获取事由列表
  addInviteInfo: '/invite/appoint/mobile/add#post' // 添加修改邀预约信息
}
let schoolApi = {
  getSchoolList: '/school/info/getSchoolInfoListPage#post' // 获取学校列表
}

for (let val in visitorApi) {
  visitorApi[val] = `${hostEnv.zx}${visitorApi[val]}`
}

for (let val in schoolApi) {
  schoolApi[val] = `${hostEnv.zk}${schoolApi[val]}`
}

let homeApi = {
  ...visitorApi,
  ...schoolApi
}

export default homeApi
