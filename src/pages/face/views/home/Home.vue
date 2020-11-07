<template>
  <div class="face u-fx-ver">
    <div class="tip">输入手机号进行查询，可查询到绑定孩子的相关家属信息~</div>
    <div class="input-box u-fx-ac">
      <input type="tel" v-model="searchForm.phone" placeholder="请输入手机号" />
    </div>
    <div class="search-btn" @click="searchList">查询</div>
    <div class="msg u-fx-jsb" v-if="faceList.length > 0">
      <div>查询到{{ total }}位家属</div>
      <div style="color: #999">拍照时请拍正脸区域</div>
    </div>
    <no-data msg="暂无查询数据" v-if="faceList.length === 0"></no-data>
    <div class="face-list" v-for="(face, index) in faceList" :key="index">
      <div class="div-img">
        <img :src="face.photoSrc || autoImg" alt />
      </div>
      <div class="u-fx-ac u-fx-jsa">
        <div class="name">{{ face.userName }}</div>
        <a href="javascript:;" class="file">
          更新人脸
          <input type="file" accept="image/*" @change="changeFile($event, index)" capture="camera" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { actions } from '../../store/index'
import NoData from '@c/common/NoData'
import hostEnv from '@config'
import EXIF from 'exif-js'
import qs from 'qs'
import $ajax from 'axios'
import autoImg from './face.png'
export default {
  name: 'Face',
  components: { NoData },
  computed: {},
  beforeCreate() {
    window.document.title = '人脸录入'
  },
  data() {
    return { total: 0, searchForm: { phone: '' }, autoImg, currentIndex: '', faceList: [] }
  },
  methods: {
    async searchList() {
      var reg = /^1[3456789]\d{9}$/
      if (this.searchForm.phone === '' || !reg.test(this.searchForm.phone)) {
        this.$notify('请输入正确的手机号')
        return false
      }
      const res = await actions.getUserInfo(this.searchForm.phone)
      this.faceList = res.data.parentDtoList || []
      this.total = this.faceList.length
    },
    changeFile(event, index) {
      this.currentIndex = index
      const read = new FileReader()
      read.onload = () => {
        let img = new Image()
        img.src = read.result
        const that = this
        img.onload = function() {
          EXIF.getData(this, function() {
            that.Orientation = EXIF.getTag(this, 'Orientation')
            if (img.width > 800 || img.height > 800) {
              img.width = 450
              img.height = 600
            }
            that.ctxWidth = img.width
            that.ctxHeight = img.height
            that.ontpys(img)
          })
        }
      }
      read.readAsDataURL(event.target.files[0])
    },
    // 校验人脸
    async checkPhoto(baseImg) {
      try {
        let res = await $ajax.post(
          `${hostEnv.hpb_face}/facePhoto`,
          qs.stringify({
            userCode: Math.floor(Math.random() * 100000),
            file: baseImg.split(',')[1]
          })
        )
        if (res.data.data.result) {
          this.uploadFace(baseImg)
        } else {
          this.$dialog({
            title: '提示',
            message: '您上传的人脸照片不符合规范，请重新上传'
          }).then(() => {})
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 压缩图片的方法
    ontpys(img) {
      let canvas = document.createElement('canvas')
      let drawer = canvas.getContext('2d')
      canvas.width = this.ctxWidth
      canvas.height = this.ctxHeight
      if ([5, 6, 7, 8].includes(this.Orientation)) {
        canvas.width = this.ctxHeight
        canvas.height = this.ctxWidth
      }
      switch (this.Orientation) {
        case 2:
          drawer.transform(-1, 0, 0, 1, this.ctxWidth, 0)
          break
        case 3:
          drawer.transform(-1, 0, 0, -1, this.ctxWidth, this.ctxHeight)
          break
        case 4:
          drawer.transform(1, 0, 0, -1, 0, this.ctxHeight)
          break
        case 5:
          drawer.transform(0, 1, 1, 0, 0, 0)
          break
        case 6:
          drawer.transform(0, 1, -1, 0, this.ctxHeight, 0)
          break
        case 7:
          drawer.transform(0, -1, -1, 0, this.ctxHeight, this.ctxWidth)
          break
        case 8:
          drawer.transform(0, -1, 1, 0, 0, this.ctxWidth)
          break
        default:
          drawer.transform(1, 0, 0, 1, 0, 0)
      }
      drawer.drawImage(img, 0, 0, this.ctxWidth, this.ctxHeight)
      let base64 = canvas.toDataURL('image/jpeg', 0.8)
      this.checkPhoto(base64)
    },
    // 更新人脸
    async uploadFace(base64) {
      try {
        await actions.updateUser({
          userId: this.faceList[this.currentIndex].userId,
          base64: base64.split(',')[1]
        })
        this.faceList[this.currentIndex].photoSrc = base64
        this.$dialog({
          title: '提示',
          message: '人脸更新成功'
        }).then(() => {})
      } catch (err) {}
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.face {
  padding: 10px 50px 40px;
  background-color: #fff;
  .tip {
    color: #999;
    padding: 20px 0;
    text-align: center;
  }
  .msg {
    color: #1e88c7;
    padding: 20px 0;
  }
  .input-box {
    height: 88px;
    border: 1px #ccc solid;
    border-radius: 8px;
    overflow: hidden;
    padding: 0 15px;
    margin-top: 20px;
    background: #f5f5f5;
    input {
      padding-left: 5px;
      color: #666;
      border: none;
      width: 100%;
      height: 75px;
      line-height: 75px;
    }
  }
  .mar-l20 {
    margin-left: 20px;
  }
  .search-btn {
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: #1e88c7;
    opacity: 0.8;
    color: #fff;
    border-radius: 8px;
    margin-top: 30px;
  }
  .face-list {
    border-radius: 4px;
    padding: 50px 0 40px 0;
    margin: 20px auto;
    background: #f5f5f5;
    width: 600px;
    text-align: center;
    box-shadow: 2px 2px 2px #f5f5f5;
    .div-img {
      width: 500px;
      height: 600px;
      margin: 0 auto 40px auto;
      background: #eee;
      box-shadow: 0px 0px 4px #ccc;
    }
    img {
      margin: 0 auto;
      width: 500px;
      height: 600px;
      display: block;
    }
    .name {
      color: #1e88c7;
    }
    .file {
      position: relative;
      display: inline-block;
      background: #d0eeff;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      color: #1e88c7;
      text-decoration: none;
      text-indent: 0;
      width: 200px;
      line-height: 60px;
      box-shadow: 2px 2px 8px #1e88c7;
    }
    .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
    }
    .file:hover {
      background: #aadffd;
      border-color: #78c3f3;
      color: #004974;
      text-decoration: none;
    }
  }
}
</style>
