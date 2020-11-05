/**
 * @description 多环境接口配置
 * @author zhangli
 */
/* eslint-disable */
const ConfigEnv = process.env.VUE_APP_URL
let host = ''
let zhuxu = ''
let wangxuanzhang = ''
let zx_mobile_user = ''
let zx_visitor = ''
let lz_user_center = ''
let zk_school = ''
let hpb_face = ''
let zk_face = ''

if (ConfigEnv === 'test') {
  host = 'http://canpointtest.com'
  wangxuanzhang = '/api-mobile-ncov'
  zhuxu = '/api-mobile-ncov'
  zx_mobile_user = '/zx_mobile_user'
  zx_visitor = '/zx_visitor'
  zk_school = '/zk_school'
  hpb_face = '/hpb_face'
  zk_face = '/zk_face'
  lz_user_center = '/lz_user_center'
} else if (ConfigEnv === 'prod') {
  host = 'http://canpointlive.com'
  zhuxu = '/api-mobile-ncov'
  zx_mobile_user = '/zx_mobile_user'
  zx_visitor = '/zx_visitor'
  zk_school = '/zk_school'
  lz_user_center = '/lz_user_center'
  hpb_face = '/hpb_face'
  zk_face = '/zk_face'
} else {
  zhuxu = '/api-mobile-ncov'
  zx_mobile_user = '/zx_mobile_user'
  zx_visitor = '/zx_visitor'
  zk_school = '/zk_school'
  hpb_face = '/hpb_face'
  zk_face = '/zk_face'
  lz_user_center = '/lz_user_center'
}

export default {
  host,
  zhuxu,
  lz_user_center,
  wangxuanzhang,
  zx_mobile_user,
  zx_visitor,
  zk_school,
  hpb_face,
  zk_face
}
