<template>
  <div class="index-container">
    <h1>I M index.vue </h1>
    <div class="icon-container">
      <i class="vunt-icon icon-vue"></i>
      <span>&plus;</span>
      <i class="vunt-icon icon-antd"></i>
    </div>
    <a-button type="primary">Click me!</a-button>
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted() {
      // this.$success({
      //   title: 'Updated title',
      //   content: 'Updated content'
      // })
    }
  }
</script>

<style lang="less" scoped>
  .index-container {
    & > h1 {
      color: #F47378;
      font-size: 24px;
    }
  }

  .icon-container {
    * {
      font-size: 48px;
    }

    span {
      margin: 0 12px;
    }
  }

</style>
