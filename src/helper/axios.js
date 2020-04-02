/**
 * Axios default configuration
 */

import axios from 'axios'
import Qs from 'qs'

const config = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000,
  responseType: 'json',
  maxContentLength: -1
}

axios.defaults.transformRequest = [function (data, config) {
  const contentType = config['Content-Type']
  if (!contentType) return Qs.stringify(data)
  if (/application\/json/.test(contentType.toLowerCase())) {
    return JSON.stringify(data)
  } else if (/multipart\/form-data/.test(contentType.toLowerCase())) {
    return data
  } else {
    return Qs.stringify(data)
  }
}]

export const CancelToken = axios.CancelToken

export default axios.create(config)
