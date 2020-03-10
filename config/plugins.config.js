const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const HTMLInjectConfig = require('./webpack-plugins/html-inject-config')
const HtmlInjectIconfont = require('./webpack-plugins/html-inject-iconfont')

const plugins = [
  /* Inject global static variables to index.html */
  new HTMLInjectConfig(),

  /* Inject *.css from public/assets/icons */
  // new HtmlInjectIconfont({ iconsFile: 'assets/icons/iconfont.css' }),
  new HtmlInjectIconfont()
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

module.exports = plugins
