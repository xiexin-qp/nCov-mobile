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

if (ConfigEnv === 'test') {
  host = 'http://canpointtest.com'
  wangxuanzhang = '/api-mobile-ncov'
  zhuxu = '/api-mobile-ncov'
} else if (ConfigEnv === 'prod') {
  host = 'http://canpointlive.com'
  wangxuanzhang = '/api-mobile-ncov'
  zhuxu = '/api-mobile-ncov'
} else {
  wangxuanzhang = '/zhuxu'
  zhangkukn = '/zhangkukn'
  zhuxu = '/zhuxu'
  lvzhuo = '/lvzhuo'
  zx = '/zx'
  zk = '/zk'
}

export default {
  wangxuanzhang,
  zhangkukn,
  zhuxu,
  lvzhuo,
  host,
  zx,
  zk
}
