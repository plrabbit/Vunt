import Vue from 'vue'
import App from './App.vue'
import router from './router'
import guarder from './helper/guarder'
import store from './store'

// Axios interceptor
import './helper/interceptor'

// Ant Design
import './ant-components'

// Global function for cancelling request
import cancelRequest from './utils/cancel-request'
Vue.use(cancelRequest)

// Router guarder
guarder(router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
