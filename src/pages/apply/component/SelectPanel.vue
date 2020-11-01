<template>
  <van-popup position="right" v-model="selectTag" :style="{ width: '80%', height: '100%' }">
    <van-picker
      show-toolbar
      :title="title"
      :columns="selectList"
      @cancel="selectTag = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>
<script>
export default {
  name: 'SelectPanel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择'
    },
    selectList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    selectTag: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    }
  },
  methods: {
    onConfirm (a) {
      this.$emit('input', false)
      this.$emit('confirm', a)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
