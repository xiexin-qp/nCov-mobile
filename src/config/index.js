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
  hostEnv = ''
} else if (ConfigEnv === 'prod') {
  hostEnv = ''
} else {
  wangxuanzhang = '/wangxuanzhang'
  zhangkukn = '/zhangkukn'
  zhuxu = '/zhuxu'
  lvzhuo = '/lvzhuo'
}

export default {
  wangxuanzhang,
  zhangkukn,
  zhuxu,
  lvzhuo
}
