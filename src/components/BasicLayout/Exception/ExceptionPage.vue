<template>
  <div class="exception">
    <div class="imgBlock">
      <div class="imgEle" :style="{backgroundImage: `url(${config[type].img})`}">
      </div>
    </div>
    <div class="content">
      <h1>{{ config[type].title }}</h1>
      <div class="desc">{{ config[type].desc }}</div>
      <div class="actions">
        <a-button type="primary" @click="handleToHome">{{ config.back }}</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import types from './locale/enUS'

export default {
  name: 'Exception',
  props: {
    type: {
      type: String,
      default: '404'
    },
    lang: {

    }
  },
  data () {
    return {
      config: types
    }
  },
  methods: {
    handleToHome () {
      this.$router.push('/Home')
    }
  }
}
</script>
<style lang="less">
@import "~ant-design-vue/lib/style/index";

.exception {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 500px;

  .imgBlock {
    flex: 0 0 50%;
    width: 50%;
    padding-right: 64px;
    zoom: 1;
    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  }

  .imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    flex: 0 0 30%;

    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .desc {
      margin-bottom: 16px;
      color: @text-color-secondary;
      font-size: 20px;
      line-height: 28px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}

@media screen and (max-width: @screen-xl) {
  .exception {
    .imgBlock {
      padding-right: 24px;
    }
  }
}

@media screen and (max-width: @screen-lg) {
  .exception {
    .imgBlock {
      padding: 0 24px;
    }

    .content {
      flex: 0 0 45%;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .exception {
    display: block;
    text-align: center;
    .imgBlock {
      margin: 0 auto 24px;
      padding-right: 0;
    }
    .imgEle {

    }
  }
}

@media screen and (max-width: @screen-xs) {
  .exception {
    .imgBlock {
      margin-bottom: -24px;
      overflow: hidden;
    }
  }
}
</style>
