<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
  </a-config-provider>
</template>

<script>
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { mapGetters } from 'vuex'

/* Remove the style element in public/index.html */
const removeIndexStyle = function () {
  const _element = window.document.getElementById('initial-loading-spin')
  if (_element) {
    const _parentElement = _element.parentNode
    if (_parentElement) {
      _parentElement.removeChild(_element)
    }
  }
}

export default {
  computed: {
    ...mapGetters({
      language: 'language'
    })
  },
  data () {
    return {
      locale: enUS,
      enUS,
      zhCN
    }
  },
  methods: {
    handleLocale () {
      const locale = this[this.language]
      if (locale) this.locale = locale
    }
  },
  beforeCreate () {
    removeIndexStyle()
  },
  created () {
    this.handleLocale()
  }
}
</script>

<style lang="less">
@import "style/scrollbar";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
