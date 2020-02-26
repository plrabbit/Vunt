const modifyVars = require('./config/modifyVars.theme')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  css: {
    loaderOptions: {
      less: {
        /* Customize themes, modify it in /config/modifyVars.theme.js */
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
  /* Compile dependencies in node_modules */
  transpileDependencies: [],
  configureWebpack: require('./config/vue.webpack.config').configureWebpack,
  chainWebpack: require('./config/vue.webpack.config').chainWebpack
}
