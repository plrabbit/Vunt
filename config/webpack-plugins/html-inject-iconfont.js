/**
 * Webpack Plugin
 * Inject public/icons/*.css to index.html
 * @class
 */
const fs = require('fs')
const path = require('path')

class HtmlInjectIconfont {
  constructor({iconsPath, iconsFile} = {}) {
    iconsPath = iconsPath || 'assets/icons'
    iconsFile = iconsFile || 'all'

    this.iconsPath = iconsPath
    this.absIconsPath = path.resolve(process.cwd(), path.resolve('public', iconsPath))
    this.iconsFile = iconsFile
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlInjectIconfont', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlInjectIconfont', (data, callback) => {
        this.getIconfont().then(iconfontFiles => {
          data.assets.css = iconfontFiles.concat(data.assets.css)
          console.log(data.assets.css)
          callback(null, data)
        }).catch(err => {
          console.log(`\n${err}`)
          process.exit(1)
        })
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

  async getIconfont() {
    const { iconsPath, absIconsPath, iconsFile } = this
    if(iconsFile !== 'all') {
      return [iconsFile]
    } else {
      const iconfontFiles = []
      const files = await this.readdir(absIconsPath)
      files.forEach(filename => {
        if (/\.css$/.test(filename)) {
          iconfontFiles.push(`${iconsPath}/${filename}`)
        }
      })
      return iconfontFiles
    }

  }
}

module.exports = HtmlInjectIconfont
