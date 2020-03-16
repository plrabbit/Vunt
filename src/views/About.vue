<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="primary">Click me!</a-button>
  </div>
</template>

<script>
import axios from '@/utils/axios'

export default {
  mounted () {
    axios('https://www.plrabbit.com/home/api.php?a=list&m=article', {
      methods: 'get'
    }).then(res => {
      console.log(res)
    })
  }
}
</script>
