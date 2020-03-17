/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let homeApi = {
  parRegister: '/mobile/patriarchinfo/stu/mobile/save#post', // 家长注册
  teaRegister: '/user/staff/save#post' // 教职工注册
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv}${homeApi[val]}`
}

export default homeApi
