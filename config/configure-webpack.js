const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HTMLInjectConfig = require('./webpack-plugins/html-inject-config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => {
  const baseConfig = {
    /* toggle file size warning hints */
    // performance: {
    //   hints: false
    // }
  }

  const plugins = [
    /* Inject global static variables to index.html */
    new HTMLInjectConfig('/')
  ]

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      /* An alternative of AutoDll Plugin */
      new HardSourceWebpackPlugin()
    )

    /* Bundle size analysis */
    plugins.push(
      new BundleAnalyzerPlugin()
    )
  }

  return Object.assign({}, baseConfig, {
    plugins
  })
}
