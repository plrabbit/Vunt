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
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    SideMenu
  },
  computed: {
    ...mapGetters({
      language: 'language'
    })
  },
  data () {
    return {
      menus
    }
  }
}
</script>

<style lang="less" scoped>
#nav {
  position: relative;
}
</style>
