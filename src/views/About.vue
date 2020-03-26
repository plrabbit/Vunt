<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="primary">Click me!</a-button>
  </div>
</template>

<script>
import blogArticles from '@/base/mixin/base-features'

export default {
  mixins: [blogArticles],
  created () {
    // this.$api.blogArticles('get', {
    //   userId: '7008656'
    // }, {
    //   m: 'article',
    //   a: 'list'
    // }).then(res => {
    //   console.log(res)
    // })
  }
}
</script>
