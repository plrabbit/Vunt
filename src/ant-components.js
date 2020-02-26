import Vue from 'vue'

import {
  Button,
  message,
  Modal
} from 'ant-design-vue'

Vue.use(Button)

Vue.prototype.$message = message;
// Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;
