import Vue from 'vue'

/* Import as we need. */
import {
  LocaleProvider,
  Button,

  message,
  notification,
  Modal
} from 'ant-design-vue'

/* message, notification, Modal are not required to Vue.use() */
[
  LocaleProvider,
  Button
].forEach(n => {
  Vue.use(n)
})

Vue.prototype.$message = message

Vue.prototype.$notification = notification

Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll
