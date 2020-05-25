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
      '/wangxuanzhang': {
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
      zx: {
        target: 'http://canpointtest.com/zx_visitor/', // 朱旭访客
        // target: 'http://192.168.1.24:10160/',
        changeOrigin: true,
        pathRewrite: {
          '^/zx': ''
        }
      },
      zk: {
        // target: 'http://192.168.1.23:10050/', // 张坤平台学校
        target: 'http://canpointtest.com/zk_school/',
        changeOrigin: true,
        pathRewrite: {
          '^/zk': ''
        }
      },
      hpb_face: {
        target: 'http://39.97.213.205:8092/',
        changeOrigin: true,
        pathRewrite: {
          '^/hpb_face': ''
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
