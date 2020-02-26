<template>
  <div class="index-container">
    <h1>I M index.vue</h1>
    <a-button type="primary">Click me!</a-button>
    <router-view />
  </div>
</template>

<script>
  export default {
    mounted () {
      // this.$message.success('Hello!')
      this.$success({
        title: 'Updated title',
        content: 'Updated content',
      })
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
</style>
