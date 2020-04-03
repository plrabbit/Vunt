<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button @click="handleClick" type="primary">Click me!</a-button>
    <a-button @click="handleCancel" type="danger">Cancel!</a-button>
  </div>
</template>

<script>
import baseFeatures from '@/base/mixin/base-features'

export default {
  mixins: [baseFeatures],
  methods: {
    handleClick () {
      this.$api.getArticles('GET', {
        m: 'article',
        a: 'list'
      })
    },
    handleCancel () {
      this.$cancelRequest('GET', this.$api.getArticles)
    }
  }
}
</script>
