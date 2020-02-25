const sourcesCDN = require('./cdn.config')
const plugins = require('./plugins.config')

const isProduction = process.env.NODE_ENV === 'production'

/**
 * configureWebpack in vue.config.js
 */
const configureWebpack = function () {
  const baseConfig = {
    performance: {
      /* The way that shows hints about building files sizes */
      hints: 'warning'
    },

    /* CDN resources */
    externals: isProduction ? sourcesCDN.externals : {}
  }

  return Object.assign({}, baseConfig, {
    plugins
  })
}

/**
 * chainWebpack in vue.config.js
 */
const chainWebpack = function(config) {
  if (isProduction) {
    config.plugin('html').tap(args => {
      args[0].cdn = sourcesCDN
      return args
    })
  }
}

module.exports = { configureWebpack, chainWebpack }
