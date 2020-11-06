// 静态配置对象
const staticConfig = window.__config__ || {}

export const ApiHost = staticConfig.API_HOST || 'http://127.0.0.1:8000'

export const AppName = staticConfig.APP_NAME || ''
