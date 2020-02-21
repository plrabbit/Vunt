<template>
  <div>
    <h1>I M About.VUE</h1>
  </div>
</template>

<script>
  import { API_HOST } from '../config'
  export default {
    mounted () {
      console.log(API_HOST)
    }
  }
</script>

<style lang="less" scoped>
@color: #6BD089;

h1 {
  color: @color;
  font-size: 32px;
}
</style>
