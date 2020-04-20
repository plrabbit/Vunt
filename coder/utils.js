const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js

const styles = {
  bold: ['\x1B[1m', '\x1B[22m'],
  italic: ['\x1B[3m', '\x1B[23m'],
  underline: ['\x1B[4m', '\x1B[24m'],
  inverse: ['\x1B[7m', '\x1B[27m'],
  strikethrough: ['\x1B[9m', '\x1B[29m'],
  white: ['\x1B[37m', '\x1B[39m'],
  grey: ['\x1B[90m', '\x1B[39m'],
  black: ['\x1B[30m', '\x1B[39m'],
  blue: ['\x1B[34m', '\x1B[39m'],
  cyan: ['\x1B[36m', '\x1B[39m'],
  green: ['\x1B[32m', '\x1B[39m'],
  magenta: ['\x1B[35m', '\x1B[39m'],
  red: ['\x1B[31m', '\x1B[39m'],
  yellow: ['\x1B[33m', '\x1B[39m'],
  whiteBG: ['\x1B[47m', '\x1B[49m'],
  greyBG: ['\x1B[49;5;8m', '\x1B[49m'],
  blackBG: ['\x1B[40m', '\x1B[49m'],
  blueBG: ['\x1B[44m', '\x1B[49m'],
  cyanBG: ['\x1B[46m', '\x1B[49m'],
  greenBG: ['\x1B[42m', '\x1B[49m'],
  magentaBG: ['\x1B[45m', '\x1B[49m'],
  redBG: ['\x1B[41m', '\x1B[49m'],
  yellowBG: ['\x1B[43m', '\x1B[49m']
}

exports.log = function (key, obj) {
  if (typeof obj === 'string') {
    console.log(styles[key][0] + '%s' + styles[key][1], obj)
  } else if (typeof obj === 'object') {
    console.log(styles[key][0] + '%o' + styles[key][1], obj)
  } else {
    console.log(styles[key][0] + '%s' + styles[key][1], obj)
  }
}

exports.readFileList = function (dir) {
  const filesList = []
  const apiSchemasPath = dir
  handler(dir, filesList)
  function handler (directory, filesList = []) {
    const files = fs.readdirSync(directory)
    files.forEach(item => {
      const fullPath = path.join(directory, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        handler(path.join(directory, item), filesList)
      } else {
        filesList.push(path.relative(apiSchemasPath, fullPath).replace(/\\/g, '/'))
      }
    })
    return filesList
  }
  return filesList
}

exports.writeFile = function (filepath, filename, content) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath, { recursive: true })
  }
  const fileDir = path.dirname(path.resolve(filepath, `${filename}`))
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true })
  }
  fs.writeFileSync(path.resolve(filepath, `${filename}`), content, { encoding: 'utf8' })
}
exports.beautifyJs = function (content) {
  content = content.replace(/(\r\n|\n)\s*/g, '\n')
    .replace(/\(\n/g, '(')
    .replace(/,\n/g, ',')
    .replace(/\/\*\*/g, '\n/**')
    .replace(/\n\/\//g, '\n\n//')

  return beautify(content, {
    indent_with_tabs: false,
    indent_size: 2,
    jslint_happy: true,
    end_with_newline: true,
    space_after_anon_function: true,
    space_after_named_function: true
  })
}

function deleteFolderRecursive (url) {
  let files = []
  if (fs.existsSync(url)) {
    files = fs.readdirSync(url)
    files.forEach(function (file, index) {
      const curPath = path.join(url, file)
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(url)
  } else {
    throw new Error('Invalid url')
  }
}

exports.deleteFolderRecursive = deleteFolderRecursive
