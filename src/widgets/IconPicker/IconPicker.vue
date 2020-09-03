<template>
  <div @click="toggleChoosing" class="iconPicker iconPickerBtn">
    <a-icon :type="value" />
    <transition name="fade">
      <div v-show="containerChoosingOpened" @click="e => e.stopPropagation()" class="containerChoosing" :class="{ alignLeft: align === 'left', alignRight: align === 'right' }">

      </div>
    </transition>
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
    },
    align: {
      default: () => 'center',
      validator: function (value) {
        return ['left', 'center', 'right'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      containerChoosingOpened: false
    }
  },
  methods: {
    toggleChoosing () {
      this.containerChoosingOpened = !this.containerChoosingOpened
    }
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  opacity: 1;
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@btnPadding: 6px;

.iconPickerBtn {
  position: relative;
  padding: @btnPadding;
  line-height: 1;
  border: 1px #cccccc solid;
  border-radius: .1em;
  display: inline-block;
  cursor: pointer;

  > .anticon {
    vertical-align: bottom;
  }

  .containerChoosing {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    width: 200px;
    height: 200px;
    border: 1px #cccccc solid;
    border-radius: .1em;
    box-shadow: 0 6px 16px 1px rgba(0, 0, 0, .05);
    transform: translateX(-50%);
    cursor: default;

    &::before, &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translateX(-50%);
    }

    &::before {
      border: 10px transparent solid;
      border-bottom: 10px #cccccc solid;
    }

    &::after {
      border: 9px transparent solid;
      border-bottom: 9px #ffffff solid;
    }

    &.alignLeft {
      left: 0;
      transform: none;

      &::before {
        left: calc(.5em - @btnPadding);
        transform: none;
      }

      &::after {
        left: calc(.5em - @btnPadding + 1px);
        transform: none;
      }
    }

    &.alignRight {
      left: auto;
      right: 0;
      transform: none;

      &::before {
        left: auto;
        right: calc(.5em - @btnPadding);
        transform: none;
      }

      &::after {
        left: auto;
        right: calc(.5em - @btnPadding + 1px);
        transform: none;
      }
    }
  }
}
</style>
