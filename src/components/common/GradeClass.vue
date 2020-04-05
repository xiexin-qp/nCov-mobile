<template>
  <van-popup position="bottom" v-model="selectTag">
    <van-picker show-toolbar :title="title" :columns="selectList" @cancel="selectTag = false" @confirm="onConfirm" />
  </van-popup>
</template>
<script>
import $ajax from '@u/ajax-serve'
import hostEnv from '@config'
export default {
  name: 'GradeClass',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    shcoolCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      title: '选择年级',
      gradeInfo: {
        gradeCode: '',
        gradeName: '',
        clazzCode: '',
        clazzName: '',
      },
      selectList: [],
      gradeUrl: `${hostEnv.wangxuanzhang}/operate/gradeinfo/getGradelist?schoolCode=${this.shcoolCode}`,
      classUrl: `${hostEnv.wangxuanzhang}/school/classInfo/getClassInfoByGradeCode?schoolCode=${this.shcoolCode}`,
    }
  },
  async mounted() {
    const res = await $ajax.get({
      url: this.gradeUrl,
    })
    this.selectList = res.result.map((item) => {
      return {
        id: item.gradeCode,
        text: item.gradeName,
      }
    })
  },
  computed: {
    selectTag: {
      get() {
        return this.value
      },
      set() {
        this.$emit('input', false)
      },
    },
  },
  methods: {
    async showClass(id) {
      const res = await $ajax.post({
        url: this.classUrl + '&gradeCode=' + id,
      })
      this.selectList = res.result.map((item) => {
        return {
          id: item.classCode,
          text: item.className,
        }
      })
    },
    onConfirm(item) {
      if (!item) {
        this.$emit('input', false)
        this.$emit('confirm', this.gradeInfo)
        return
      }
      if (!this.gradeInfo.gradeCode) {
        this.gradeInfo.gradeCode = item.id
        this.gradeInfo.gradeName = item.text
        this.title = '选择班级'
        this.showClass(item.id)
      } else if (!this.gradeInfo.classCode) {
        this.gradeInfo.clazzCode = item.id
        this.gradeInfo.clazzName = item.text
        this.$emit('input', false)
        this.$emit('confirm', this.gradeInfo)
      }
    },
  },
}
</script>
<style lang="less" scoped></style>
