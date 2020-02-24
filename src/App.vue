<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
  /* Remove the style element in public/index.html */
  const removeIndexStyle = function() {
    const _element = window.document.getElementById('initial-loading-spin')
    const _parentElement = _element.parentNode;
    if(_parentElement){
      _parentElement.removeChild(_element);
    }
  }

  export default {
    beforeCreate() {
      removeIndexStyle()
    }
  }
</script>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
