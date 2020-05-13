<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <!--<div id="nav">-->
      <!--  <router-link to="/">Home</router-link> |-->
      <!--  <router-link to="/about">About</router-link> |-->
      <!--  <router-link to="/404">Exception</router-link>-->
      <!--</div>-->
      <side-menu :menu="menus" mode="horizontal" theme="light" />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import SideMenu from '@/components/BasicLayout/SideMenu'
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
  data () {
    return {
      zhCN,
      menus
    }
  },
  beforeCreate () {
    removeIndexStyle()
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
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      /*color: #42b983;*/
      color: #40a9ff;
    }
  }
}
</style>
