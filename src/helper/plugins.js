/**
 * Global plugins
 */

export default {
  install (Vue) {
    /**
     * Global function for cancelling request
     * @param method
     * @param funcName - Your request function name, e.g getArticles
     */
    Vue.prototype.$cancelRequest = function (method, funcName) {
      if (!/^(get|post|put|patch|delete|head)$/i.test(method)) {
        console.error('Invalid method')
        return
      }
      method = method.toLowerCase()
      window.__axiosPending__.map(n => {
        if (n.name === `${method}:${funcName}`) {
          n.cancel()
        }
      })
      window.__axiosPending__ = window.__axiosPending__.filter(n => n.name !== `${method}:${funcName}`)
    }

    /**
     * Global function for cancelling all request.
     */
    Vue.prototype.$cancelAllRequest = function () {
      window.__axiosPending__.map(n => {
        n.cancel && n.cancel()
      })
      window.__axiosPending__ = []
    }

    // Some other features...
  }
}
