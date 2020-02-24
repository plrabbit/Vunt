const modifyVars = require('./config/modifyVars.theme')
const configureWebpack = require('./config/configure-webpack')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        /* Customize themes */
        modifyVars,
        /* Allow scripts to import *.less */
        javascriptEnabled: true
      }
    }
  },
  /* generate sourceMap or not */
  productionSourceMap: process.env.NODE_ENV === 'development',
  /* To make lint errors show up in the browser overlay. */
  lintOnSave: 'error',
  /* webpack-dev-server configuration */
  devServer: {
    /* gzip(only development) */
    compress: true,
    // host: '127.0.0.1',
    port: 8000
  },
  configureWebpack
}