<template>
  <div class="submit-form u-page u-fx-ver">
    <header-com isBack :title="$route.query.title"></header-com>
    <div class="u-fx-f1 u-fx">
      <submit-form></submit-form>
    </div>
  </div>
</template>

<script>
import HeaderCom from '../../component/HeaderCom'
import SubmitForm from '@c/common/SubmitForm'
export default {
  name: 'SubmitFromCom',
  components: {
    HeaderCom,
    SubmitForm
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.submit-form {
}
</style>
