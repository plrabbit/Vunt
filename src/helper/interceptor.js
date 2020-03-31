/**
 * Axios interceptors
 */

import axios from '@/helper/axios'

axios.interceptors.request.use(config => {
  // ...

  paramsEncoded(config)
  return config
})

axios.interceptors.response.use(res => {
  // ...

  return res
})

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
