/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wangxuanzhang = ''
let zhangkukn = ''
let zhuxu = ''
let lvzhuo = ''

if (ConfigEnv === 'test') {
  wangxuanzhang = '/api-mobile-ncov'
  zhuxu = '/api-mobile-ncov'
} else if (ConfigEnv === 'prod') {
  wangxuanzhang = '/api-mobile-ncov'
  zhuxu = '/api-mobile-ncov'
} else {
  wangxuanzhang = '/zhuxu'
  zhangkukn = '/zhangkukn'
  zhuxu = '/zhuxu'
  lvzhuo = '/lvzhuo'
}

export default {
  wangxuanzhang,
  zhangkukn,
  zhuxu,
  lvzhuo,
}
