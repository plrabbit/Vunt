<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <div id="nav">
        <side-menu :menu="menus" mode="horizontal" theme="light" />
      </div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
  </a-config-provider>
</template>

<script>
import { mapGetters } from 'vuex'
import SideMenu from '@/components/Basic/SideMenu'
import menus from '@/menus'

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
  components: {
    SideMenu
  },
  watch: {
    language () {
      this.handleLocale()
    }
  },
  computed: {
    ...mapGetters({
      language: 'language'
    })
  },
  data () {
    return {
      locale: {},
      menus
    }
  },
  methods: {
    handleLocale () {
      const localeFile = require(`ant-design-vue/es/locale/${this.language}`)
      this.locale = localeFile.default
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
