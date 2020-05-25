/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let host = ''
let wangxuanzhang = ''
let zhangkukn = ''
let zhuxu = ''
let lvzhuo = ''
let zx = ''
let zk = ''
let hpb_face = ''

if (ConfigEnv === 'test') {
  host = 'http://canpointtest.com'
  wangxuanzhang = '/api-mobile-ncov'
  zhuxu = '/api-mobile-ncov'
  zx = '/zx_visitor'
  zk = '/zk_school'
  hpb_face = '/hpb_face'
} else if (ConfigEnv === 'prod') {
  host = 'http://canpointlive.com'
  wangxuanzhang = '/api-mobile-ncov'
  zhuxu = '/api-mobile-ncov'
  zx = '/zx_visitor'
  zk = '/zk_school'
  hpb_face = '/hpb_face'
} else {
  wangxuanzhang = '/zhuxu'
  zhangkukn = '/zhangkukn'
  zhuxu = '/zhuxu'
  lvzhuo = '/lvzhuo'
  zx = '/zx'
  zk = '/zk'
  hpb_face = '/hpb_face'
}

export default {
  wangxuanzhang,
  zhangkukn,
  zhuxu,
  lvzhuo,
  host,
  zx,
  zk,
  hpb_face
}
