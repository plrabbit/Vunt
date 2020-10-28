<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-timer-picker/>
    <div style="margin-top: 24px;">
      <IconPicker align="center" v-model="currentIcon" />
    </div>
  </div>
</template>

<script>
import { TimePicker } from 'ant-design-vue'
import IconPicker from '@/widgets/IconPicker/IconPicker'

export default {
  components: {
    IconPicker,
    ATimerPicker: TimePicker
  },
  data () {
    return {
      currentIcon: 'deployment-unit'
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/variables";

.about {
  margin: 24px 0 0 0;
}

.iconPicker {
  font-size: 48px;
}
</style>
