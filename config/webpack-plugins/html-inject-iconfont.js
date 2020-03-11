/**
 * Webpack Plugin
 * Inject public/assets/icons/*.css to index.html
 * @class
 */
const fs = require('fs')
const path = require('path')

class HtmlInjectIconfont {
  // TODO refactoring codes.
  // TODO 1. RegExp for iconsFiles => absPath
  // TODO 2. Remove the function readdir
  // TODO 3. Markdown!!
  constructor({iconsPath, iconsFile} = {}) {
    iconsPath = iconsPath || 'assets/icons'
    iconsFile = iconsFile || 'all'

    this.iconsPath = iconsPath
    this.absIconsPath = path.resolve(process.cwd(), path.resolve('public', iconsPath))
    this.iconsFile = iconsFile
    this.iconfontFiles = []
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlInjectIconfont', compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('HtmlInjectIconfont', (data, callback) => {
        const { iconfontFiles } = this
        data.assets.css = iconfontFiles.concat(data.assets.css)
        callback(null, data)
      })
    })
    compiler.hooks.afterCompile.tapAsync('HtmlInjectIconfont', (compilation, callback) => {
      const { absIconsPath } = this
      this.getIconfont().then(iconfontFiles => {
        this.iconfontFiles = iconfontFiles
        if (Array.isArray(compilation.fileDependencies)) {
          iconfontFiles.map(function (file) {
            compilation.fileDependencies.push(path.resolve(absIconsPath, file.match(/(\w+\.css)$/)[1]))
          })
        } else {
          iconfontFiles.map(function (file) {
            compilation.fileDependencies.add(path.resolve(absIconsPath, file.match(/(\w+\.css)$/)[1]))
          })
        }
        callback()
      }).catch(err => {
        console.log(`\n${err}`)
        process.exit(1)
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
    if(Array.isArray(iconsFile)) return iconsFile
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
