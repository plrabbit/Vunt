<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-timer-picker/>
  </div>
</template>

<script>
import { TimePicker } from 'ant-design-vue'

export default {
  components: {
    ATimerPicker: TimePicker
  }
}
</script>

<style lang="less" scoped>
.about {
  margin: 24px 0 0 0;
}
</style>
