/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let faceApi = {
  getUserInfo: '/parents/student/getUserInfoByPhone#getUrl', // 获取家属信息
  updateUser: '/parents/student/updateParentPhoto#post' // 更新家属信息
}

for (let val in faceApi) {
  faceApi[val] = `${hostEnv.zk_face}${faceApi[val]}`
}

let homeApi = {
  ...faceApi
}

export default homeApi
