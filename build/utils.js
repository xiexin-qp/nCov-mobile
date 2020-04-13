'use strict'
const path = require('path')
const { logs } = require('./logs')
const pagePath = path.resolve(__dirname, '../src/pages')
const glob = require('glob')
const modulesDir = glob.sync(pagePath + '/*')
const buildModule = process.argv[process.argv.length - 1]
let projectList = []
require('colors')
modulesDir.forEach((file) => {
  projectList.push(file.split('/')[file.split('/').length - 1])
})
if (process.env.NODE_ENV === 'production') {
  if (projectList.indexOf(buildModule) === -1) {
    console.log(`请您输入正确的打包模块: ${JSON.stringify(projectList)}`.red)
    console.log(`例如: npm run build-prod ${projectList[1]}`.green)
    process.exit()
  }
  projectList = [buildModule]
  const msg = process.env.VUE_APP_URL === 'prod' ? '正式环境' : '测试环境'
  logs(`您正在打包模块：${buildModule}，打包环境：${msg}`)
}

// cdn配置
const cdn = [
  'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
  'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
  'https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js',
  'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
  'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
  'https://cdn.bootcss.com/moment.js/2.24.0/locale/zh-cn.js'
]
// 多页面配置
exports.entries = function () {
  const entries = {}
  projectList.forEach((pageDir) => {
    entries[pageDir] = {
      // 入口文件
      entry: `src/pages/${pageDir}/main.js`,
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: `${projectList.length === 1 ? 'index' : pageDir}.html`,
      // 界面标题配置
      title: '',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk
      // cdnConfig: process.env.NODE_ENV === 'production' && process.env.VUE_APP_URL === 'prod' ? cdn : [],
      cdnConfig: process.env.NODE_ENV === 'production' ? cdn : [],
      chunks: ['chunk-vendors', 'chunk-common', pageDir]
    }
  })
  return entries
}
