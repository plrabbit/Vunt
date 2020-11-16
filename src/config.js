// 静态配置对象
const staticConfig = window.__config__ || {}

export const API_HOST = staticConfig.API_HOST || 'http://127.0.0.1:8000'

export const APP_NAME = staticConfig.APP_NAME || ''
