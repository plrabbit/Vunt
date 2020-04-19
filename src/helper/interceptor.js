/**
 * Axios interceptors
 */

import axios, { CancelToken } from '@/utils/axios'

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

  filterCancelSource(`${res.config.method}@${res.config.url}`)
  return res
})

/* Inject cancel function */
const injectCancelPending = function (config) {
  config.cancelToken = new CancelToken(cancel => {
    window.__axiosPending__.push({
      name: `${config.method}@${config.url}`,
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

/* Filter cancel source in global pending Array */
const filterCancelSource = function (srcString) {
  window.__axiosPending__ = window.__axiosPending__.filter(n => n.name !== srcString)
}
