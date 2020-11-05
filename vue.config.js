const utils = require('./build/utils')
const path = require('path')
const customTheme = require('./vant-custom-theme')
const resolve = dir => path.join(__dirname, dir)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const uploadZip = require('./build/upload-zip')
const isProduction = process.env.NODE_ENV === 'production'
const isCdn = process.env.VUE_APP_URL === 'prod'
module.exports = {
  publicPath: isProduction ? './' : './',
  // 多页配置
  pages: {
    ...utils.entries()
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    // 添加别名
    config.resolve.alias
      .set('@s', resolve('src'))
      .set('@p', resolve('src/pages'))
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components'))
      .set('@com', resolve('src/components/common'))
      .set('@config', resolve('src/config/'))
      .set('@u', resolve('src/utils'))
  },
  configureWebpack: config => {
    // 配置cdn模块
    if (isProduction) {
      config.plugins.push(new uploadZip())
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
      }
      // 压缩代码
      config.optimization = {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ]
      }
    }
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      less: {
        modifyVars: customTheme.theme
      }
    }
  },
  // 本地访问代理
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      getTicket: {
        target: 'http://canpointtest.com/getTicket', // 外网
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/getTicket': ''
        }
      },
      '/zx_mobile_user': {
        target: 'http://192.168.2.134:10166/', // 朱旭-移动端用户系统
        // target: 'http://192.168.1.125:10166/', //
        // "target": "http://canpointtest.com/zx_mobile_user/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/zx_mobile_user': ''
        }
      },
      '/zk_school': {
        target: 'http://192.168.2.147:10050/', // 张坤-学校管理
        // "target": "http://canpointtest.com/zk_school/",
        changeOrigin: true,
        pathRewrite: {
          '^/zk_school': ''
        }
      },
      '/zk_leave': {
        target: 'http://192.168.1.23:10054/', // 张坤-校历请假
        // "target": "http://canpointtest.com/zk_leave/",
        changeOrigin: true,
        pathRewrite: {
          '^/zk_leave': ''
        }
      },
      '/zk_ncov': {
        target: 'http://192.168.2.147:11005/', // 张坤-疫情日报
        //"target": "http://192.168.1.125:11005/",
        // "target": "http://canpointtest.com/zk_ncov/",
        changeOrigin: true,
        pathRewrite: {
          '^/zk_ncov': ''
        }
      },
      '/zx_protal': {
        target: 'http://192.168.2.147:10060/', // 朱旭-平台应用管理
        // "target": "http://canpointtest.com/zx_protal/",
        changeOrigin: true,
        pathRewrite: {
          '^/zx_protal': ''
        }
      },
      '/lz_protal': {
        target: 'http://192.168.2.147:10060/', // 吕卓-平台应用管理
        // "target": "http://canpointtest.com/zx_protal/",
        changeOrigin: true,
        pathRewrite: {
          '^/lz_protal': ''
        }
      },
      '/zx_door': {
        target: 'http://192.168.1.24:10162/', // 朱旭-门禁系统
        // "target": "http://canpointtest.com/zx_door/",
        changeOrigin: true,
        pathRewrite: {
          '^/zx_door': ''
        }
      },
      '/zx_visitor': {
        target: 'http://192.168.2.134:10160/', // 朱旭-访客系统
        // "target": "http://canpointtest.com/zx_visitor/",
        changeOrigin: true,
        pathRewrite: {
          '^/zx_visitor': ''
        }
      },
      '/ljj_visitor': {
        target: 'http://192.168.2.134:10160/', // 柳继杰-访客系统
        // "target": "http://canpointtest.com/zx_visitor/",
        changeOrigin: true,
        pathRewrite: {
          '^/ljj_visitor': ''
        }
      },
      '/lz_attendance': {
        // "target": "http://192.168.2.242:11004/", // 吕卓-考勤
        // "target" : "http://192.168.1.46:11004/", // 吕卓-考勤
        target: 'http://canpointtest.com/lz_attendance/',
        changeOrigin: true,
        pathRewrite: {
          '^/lz_attendance': ''
        }
      },
      '/lz_user_center': {
        target: 'http://192.168.2.147:11002/', // 吕卓-用户中心
        // "target": "http://canpointtest.com/lz_user_center/",
        changeOrigin: true,
        pathRewrite: {
          '^/lz_user_center': ''
        }
      },
      '/ljj_user_center': {
        // "target": "http://192.168.1.125:11002/", // 柳继杰-用户中心
        target: 'http://192.168.2.147:11002/', // 吕卓-用户中心
        // "target": "http://canpointtest.com/lz_user_center/",
        changeOrigin: true,
        pathRewrite: {
          '^/ljj_user_center': ''
        }
      },
      '/wxz_control': {
        target: 'http://39.97.164.4:9001/', // 外网
        // target: 'http://wxz-test-001.natapp1.cc', // 王选章
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/wangxuanzhang': ''
        }
      },
      '/zhuxu': {
        target: 'http://39.97.164.4:9001/', // 外网
        // target: 'http://wxz-test-001.natapp1.cc', // 朱旭
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/zhuxu': ''
        }
      },
      '/zx_visitor': {
        target: 'http://canpointtest.com/zx_visitor/', // 朱旭访客
        // target: 'http://192.168.1.24:10160/',
        changeOrigin: true,
        pathRewrite: {
          '^/zx_visitor': ''
        }
      },
      hpb_face: {
        target: 'http://39.97.213.205:8092/',
        changeOrigin: true,
        pathRewrite: {
          '^/hpb_face': ''
        }
      },
      zk_face: {
        target: 'http://192.168.1.23:8686/',
        changeOrigin: true,
        pathRewrite: {
          '^/zk_face': ''
        }
      }
    }
  }
}
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/assets/css/variables.less')]
    })
}
