<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div :style="{ margin: '0 0 24px 0' }">
      <a-button @click="changeLocale" type="primary">Change to {{ this.language === 'en_US' ? 'zh_CN' : 'en_US' }}</a-button>
    </div>
    <a-timer-picker/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TimePicker } from 'ant-design-vue'

export default {
  components: {
    ATimerPicker: TimePicker
  },
  computed: {
    ...mapGetters({
      language: 'language'
    })
  },
  methods: {
    changeLocale () {
      this.$store.commit('TOGGLE_LANGUAGE', this.language === 'en_US' ? 'zh_CN' : 'en_US')
    }
  }
}
</script>

<style lang="less" scoped>
.about {
  margin: 24px 0 0 0;
}
</style>
