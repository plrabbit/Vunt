const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const HTMLInjectConfig = require('./webpack-plugins/html-inject-config')

const { publicPath } = require('../vue.config')

const plugins = [
  /* Inject global static variables to index.html */
  new HTMLInjectConfig(publicPath)
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

plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en/))

module.exports = plugins
