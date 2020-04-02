/**
 * Axios interceptors
 */

import axios, { CancelToken } from '@/helper/axios'

// Axios pending Array, for cancelling request.
window.__axiosPending__ = []

axios.interceptors.request.use(config => {
  injectCancelPending(config)

  // ...

  paramsEncoded(config)
  return config
})

axios.interceptors.response.use(res => {
  // ...

  spliceCancelSource(`${res.config.method}:${res.config._funcName}`)
  return res
})

/* Inject cancel function */
const injectCancelPending = function (config) {
  config.cancelToken = new CancelToken(cancel => {
    window.__axiosPending__.push({
      name: `${config.method}:${config._funcName}`,
      cancel
    })
  })
}

/* Url params encoding for special symbol */
const paramsEncoded = function (config) {
  let url = config.url
  if (config.method === 'get' && config.params) {
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      url += `${key}=${encodeURIComponent(config.params[key])}&`
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
  }
  config.url = url
}

/* Splice cancel source in global pending Array */
const spliceCancelSource = function (srcString) {
  window.__axiosPending__ = window.__axiosPending__.filter(n => n.name !== srcString)
}
