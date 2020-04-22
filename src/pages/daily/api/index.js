/**
 * @des 接口配置列表
 */

import home from './home'
import daily from './daily'
import login from './login'

let apiList = {
  ...home,
  ...daily,
  ...login
}

export default apiList
