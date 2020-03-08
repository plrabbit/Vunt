/**
 * Webpack Plugin
 * Inject public/iconfont/*.css to index.html
 * @class
 */
const fs = require('fs')
const path = require('path')

class HtmlInjectIconfont {
  constructor(iconsPath = 'iconfont') {
    this.iconfontFiles = []
    this.getIconfont(path.resolve(process.cwd(), path.resolve('public', iconsPath))).catch(err => {
      console.log(`\n${err}`)
      process.exit(1)
    })
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlInjectIconfont', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlInjectIconfont', (data, callback) => {
        data.assets.css = this.iconfontFiles.concat(data.assets.css)
        callback(null, data)
      })
    })
  }

  readdir(readPath) {
    return new Promise((resolve, reject) => {
      fs.readdir(readPath, function (err, files) {
        if (err) reject(err)
        else resolve(files)
      })
    })
  }

  async getIconfont(absIconsPath) {
    console.log(absIconsPath)
    const files = await this.readdir(absIconsPath)
    files.forEach(filename => {
      if (/\.css$/.test(filename)) {
        this.iconfontFiles.push(`${path.relative(process.cwd() + '/public', absIconsPath)}/${filename}`)
      }
    })
  }
}

module.exports = HtmlInjectIconfont
