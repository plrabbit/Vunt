/**
 * Global plugins
 */

export default {
  install (Vue) {
    /**
     * Global function for cancelling request
     * @param method
     * @param ctx - Your request function or url, e.g this.$api.getArticles, http://127.0.0.1:8080/v1/articles
     */
    Vue.prototype.$cancelRequest = function (method, ctx) {
      if (!/^(get|post|put|patch|delete|head)$/i.test(method)) {
        console.error('Invalid method')
        return
      }
      method = method.toLowerCase()
      let url
      if (typeof ctx === 'function' && ctx.url) url = ctx.url
      else if (typeof ctx === 'string') url = ctx
      window.__axiosPending__.map(n => {
        if (n.name === `${method}@${url}`) {
          n.cancel()
        }
      })
      window.__axiosPending__ = window.__axiosPending__.filter(n => n.name !== `${method}@${url}`)
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
  }
}
