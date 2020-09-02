<template>
  <div class="iconPicker iconPickerBtn">
    <a-icon :type="value" />
    <div class="containerChoosing">

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'ant-design-vue'

Vue.use(Icon)

export default {
  name: 'IconPicker',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.iconPickerBtn {
  padding: 6px;
  line-height: 1;
  border: 1px #cccccc solid;
  border-radius: .1em;
  display: inline-block;
  cursor: pointer;

  > .anticon {
    vertical-align: bottom;
  }
}
</style>
