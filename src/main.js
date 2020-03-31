import Vue from 'vue'
import App from './App.vue'
import router from './router'
import guarder from './helper/guarder'
import store from './store'

// Ant Design
import './ant-components'

guarder(router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
