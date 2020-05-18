<template>
  <div class="home">
    <div class="logo__container">
      <img src="../assets/img/Ant.svg" alt="AntD">
      <span>&plus;</span>
      <img src="../assets/img/vue.png" alt="Vue logo">
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">
.home {
  padding: 24px 0 0 0;
}

.logo__container {
  padding: 0 0 24px 0;

  img {
    width: 160px;
    vertical-align: middle;
  }

  span {
    margin: 0 24px;
    color: #cccccc;
    font-size: 48px;
    font-weight: bold;
    vertical-align: middle;
  }
}
</style>
