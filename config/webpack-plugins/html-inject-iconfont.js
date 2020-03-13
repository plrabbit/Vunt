/**
 * Webpack Plugin
 * Inject public/assets/icons/*.css to index.html
 * @class
 */
const path = require('path')

class HtmlInjectIconfont {
  constructor (cssFiles = [], publicPath = '/') {
    if (!Array.isArray(cssFiles)) throw new Error('HtmlInjectIconfont: cssFiles must be Array.')
    publicPath = `.${publicPath}`
    this.publicAbsPath = path.resolve(process.cwd(), path.join('public', publicPath))
    this.cssFiles = cssFiles
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('HtmlInjectIconfont', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlInjectIconfont', (data, callback) => {
        data.assets.css = this.cssFiles.concat(data.assets.css)
        callback(null, data)
      })
    })
    compiler.hooks.afterCompile.tapAsync('HtmlInjectIconfont', (compilation, callback) => {
      const { publicAbsPath, cssFiles } = this
      if (Array.isArray(compilation.fileDependencies)) {
        cssFiles.map(file => {
          compilation.fileDependencies.push(path.resolve(publicAbsPath, file))
        })
      } else {
        cssFiles.map(file => {
          compilation.fileDependencies.add(path.resolve(publicAbsPath, file))
        })
      }
      callback()
    })
  }
}

module.exports = HtmlInjectIconfont
