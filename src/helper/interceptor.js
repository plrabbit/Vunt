/**
 * Axios interceptors
 */

import axios, { CancelToken } from '@/helper/axios'

window.__axiosRequestPending__ = new Map()

axios.interceptors.request.use(config => {
  handleRequestPending(config)

  // ...

  paramsEncoded(config)
  return config
})

axios.interceptors.response.use(res => {
  // ...

  window.__axiosRequestPending__.delete(`${res.config.method}&${res.config.url}`)

  return res
})

/* Request Handler */
const handleRequestPending = function (config) {
  const reqCancel = window.__axiosRequestPending__.get(`${config.method}&${config.url}`)
  if (reqCancel) {
    reqCancel()
    window.__axiosRequestPending__.delete(`${config.method}&${config.url}`)
  }
  injectCancelPending(config)
}

/* Inject cancel function */
const injectCancelPending = function (config) {
  config.cancelToken = new CancelToken(cancel => {
    window.__axiosRequestPending__.set(`${config.method}&${config.url}`, cancel)
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
