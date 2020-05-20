<template>
  <div>
    <div id="nav">
      <side-menu :menu="menus" mode="horizontal" theme="light" />
    </div>
    <router-view />
  </div>
</template>

<script>
import SideMenu from '@/components/Basic/SideMenu'
import menus from '@/menus'

export default {
  name: 'Index',
  components: {
    SideMenu
  },
  data () {
    return {
      menus
    }
  }
}
</script>

<style scoped>

</style>
