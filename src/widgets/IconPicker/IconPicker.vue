<template>
  <a-popover v-bind="popoverOptions" v-model="containerChoosingOpened" class="iconPicker iconPickerBtn">
    <a-icon :type="value" />
    <div slot="content" class="containerChoosing">
<!--      <div @click="e => e.stopPropagation()" :class="{ alignLeft: align === 'left', alignRight: align === 'right', wow: containerChoosingOpened }" class="containerChoosing" id="widget-icon-picker__containerChoosing">-->
        <div class="iconWrapper">
          <span v-for="(icon, index) in collection" :key="index" @click="handleSelectIcon(icon)"
                class="iconItem" :class="{ selected: icon === state.selectedIcon }">
            <a-icon :type="icon" />
          </span>
        </div>
        <div class="iconToolbar">
          <div class="currentIcon">
            <span>Selected:</span>
            <a-icon :type="state.selectedIcon" />
          </div>
          <div class="buttons">
            <a-button @click="handleCloseChoosing" size="small">Close</a-button>
            <a-button type="primary" size="small">Confirm</a-button>
          </div>
        </div>
<!--      </div>-->
    </div>
  </a-popover>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Icon, Button, Popover } from 'ant-design-vue'
import { collection } from './dict'

Vue.use(Icon)
Vue.use(Button)
Vue.use(Popover)

export default {
  name: 'IconPicker',
  model: {
    event: 'change'
  },
  props: {
    ...Popover.props,
    value: {
      type: String,
      default: () => '',
      validator: value => {
        return collection.indexOf(value) !== -1
      }
    }
  },
  computed: {
    ...mapGetters({
      language: 'language'
    }),
    popoverOptions: function () {
      const options = { ...this.$props }
      delete options.value
      if (!options.visible) delete options.visible
      return options
    }
  },
  data () {
    const selectedIcon = this.value || ''
    return {
      collection,
      locale: {},
      containerChoosingOpened: false,
      state: {
        selectedIcon
      }
    }
  },
  methods: {
    handleCloseChoosing () {
      this.containerChoosingOpened = false
    },
    handleSelectIcon (icon) {
      this.state.selectedIcon = icon
    }
  }
}
</script>

<style lang="less">
@import '../Base/styles';

@btnPadding: 6px;
@picker-font-size: 24px;

.iconPickerBtn {
  position: relative;
  padding: @btnPadding;
  line-height: 1;
  border: 1px @common-border-color solid;
  border-radius: .1em;
  display: inline-block;
  cursor: pointer;

  &.anticon > svg {
    vertical-align: bottom;
  }
}

.containerChoosing123 {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  padding: 12px;
  text-align: left;
  font-size: @picker-font-size !important;
  background-color: #fff;
  border: 1px @common-border-color solid;
  border-radius: .1em;
  box-shadow: 0 6px 16px 1px rgba(0, 0, 0, .05);
  opacity: 0;
  visibility: hidden;
  transition: opacity .25s, visibility .25s;
  transform: translateX(-50%);
  cursor: default;

  &.wow {
    opacity: 1;
    visibility: visible;
  }

  &::before, &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
  }

  &::before {
    border-left: 10px transparent solid;
    border-right: 10px transparent solid;
    border-bottom: 10px @common-border-color solid;
  }

  &::after {
    border-left: 9px transparent solid;
    border-right: 9px transparent solid;
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

.iconWrapper {
  width: 488px;
  height: 180px;
  border-bottom: 1px @common-border-color solid;
  overflow: auto;
  box-sizing: content-box;

  .iconItem {
    padding: 4px;
    border: 2px transparent solid;
    border-radius: @common-border-radius;
    overflow: hidden;
    vertical-align: bottom;
    display: inline-block;
    cursor: pointer;

    &.selected {
      border-color: lightcoral;
    }

    i, svg {
      font-size: @picker-font-size;
      vertical-align: bottom;
      display: block;
    }
  }
}

.iconToolbar {
  padding-top: 12px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .currentIcon, .buttons {
    display: flex;
  }

  .currentIcon {
    span, i {
      vertical-align: middle;
    }

    span {
      margin-right: 6px;
      font-size: 14px;
    }
  }

  button {
    margin: 0 0 0 12px;
  }
}
</style>
