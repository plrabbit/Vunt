/**
 * Webpack Plugin
 * Inject public/config.js to index.html
 * @class
 */
class HtmlInjectConfig {
  constructor (publicPath = '/') {
    this.files = [publicPath + 'config.js?t=' + (new Date().getTime())]
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('HtmlInjectConfig', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlInjectConfig', (data, callback) => {
        data.assets.js = this.files.concat(data.assets.js)
        callback(null, data)
      })
    })
  }
}

module.exports = HtmlInjectConfig
