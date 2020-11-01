<template>
  <div class="apply qui-fx-ver">
    <Header :title="`填写申请(${step}/3)`" />
    <div class="from-main">
      <FormOne v-show="step == 1" @changeStep="changeStep" />
      <FormTwo v-show="step == 2" @changeStep="changeStep" />
      <FormThree v-show="step == 3" @changeStep="changeStep" @submit="submit" />
    </div>
    <!-- <div class="from-footer">
      <StepBtn @changeStep="changeStep" />
    </div> -->
  </div>
</template>

<script>
import Header from '../../component/Header.vue'
import FormOne from '../../component/FormOne.vue'
import FormTwo from '../../component/FormTwo.vue'
import FormThree from '../../component/FormThree.vue'

export default {
  name: 'ApplyFrom',
  components: {
    Header,
    FormOne,
    FormTwo,
    FormThree,
  },
  computed: {},
  data() {
    return {
      step: 1,
    }
  },
  mounted() {},
  methods: {
    changeStep(step) {
      this.step = step
    },
    submit() {},
  },
}
</script>
<style lang="less" scoped>
.apply {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .from-main {
    flex: 1;
    overflow-y: scroll;
  }

  .from-footer {
    height: 100px;
  }
}
</style>
