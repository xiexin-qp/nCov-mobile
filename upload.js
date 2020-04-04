/**
 *
 * @Description 压缩文件后上传服务器
 * @Author 张立
 * @Created 2019-06-21
 *
 */
const request = require('request')
const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')
var zip = new AdmZip()
const params = process.argv.slice(2)
const buildModule = params[0]
if (params.length === 0) {
  console.log('请在命令中输入上传项目名称')
  return
}
let total = 1
const time = setInterval(() => {
  console.log(total++)
}, 1000)
let url, msg
if (params.indexOf('release') > -1) {
  msg = `正在上传正式环境${buildModule}模块，请耐心等候...`
  url = 'http://39.105.218.215:8090/upload-ncov'
} else if (params.indexOf('test') > -1) {
  msg = `正在上传测试环境${buildModule}模块，请耐心等候...`
  url = 'http://39.105.218.215:8090/upload-ncov'
} else {
  msg = `正在上传开发环境${buildModule}模块，请耐心等候...`
  url = 'http://39.105.218.215:8090/upload-ncov'
}
zip.addLocalFolder('dist')
zip.writeZip(`${buildModule}.zip`)
console.log(path.resolve(__dirname, `${buildModule}.zip`))
console.log('\x1b[32m', '*************************************', '\n')
console.log('\x1b[32m', msg, '\n')
console.log('\x1b[32m', '*************************************', '\n')
var formData = {
  file: fs.createReadStream(path.resolve(__dirname, `${buildModule}.zip`)),
}
request.post(
  {
    url: url,
    formData: formData,
  },
  function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // 删除压缩包
      fs.unlink(`${buildModule}.zip`, function () {})
      console.log('上传成功')
      clearInterval(time)
    }
  }
)
