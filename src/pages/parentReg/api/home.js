/**
 * @description 接口列表主模块
 * @params get, getUrl(参数直接拼接在url斜杠后面), post(JSON数据提交), postForm(表单数据提交)
 * @params false: 请求没有加载提示，默认有
 */

import hostEnv from '@config'

let homeApi = {
  parRegister: '/mobile/user/info/parent/add#post', // 家长注册
  getCode: '/mobile/user/info/code/send#getUrl' // 获取验证码
}

for (let val in homeApi) {
  homeApi[val] = `${hostEnv.zx_mobile_user}${homeApi[val]}`
}

export default {
  ...homeApi,
  getSchoolInfo: `${hostEnv.zk_school}/school/info/getSchoolByCode#getUrl`, // 查询学校信息
  getChildInfo: `${hostEnv.lz_user_center}/userinfo/student/user/queryStudentInfoList#postJsonQuery`, // 获取学生信息
  getChildInfoHighSchool: `${hostEnv.lz_user_center}/student/manage/queryStudentInfoByUserCode#get` // 高校获取学生信息
}
