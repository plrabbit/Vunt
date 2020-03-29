<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="primary">Click me!</a-button>
  </div>
</template>

<script>
import { getArticles } from '@/base/api/base-features'

export default {
  created () {
    getArticles('get', { userId: '7008' }, {
      m: 'article', a: 'list'
    })
  }
}
</script>
