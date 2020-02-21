const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HTMLInjectConfig = require('./webpack-plugins/html-inject-config')

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
  }

  return Object.assign({}, baseConfig, {
    plugins
  })
}