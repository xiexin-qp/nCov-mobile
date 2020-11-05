/**
 * @des 接口配置列表
 */

import home from './home'
import hostEnv from '@config'

let apiList = {
  ...home,
  facePhoto: `${hostEnv.hpb_face}/facePhoto`
}

export default apiList
