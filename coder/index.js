const fs = require('fs')
const path = require('path')
const beautify = require('js-beautify').js_beautify

const apiRender = require('./templates/api')

/* API_HOST states in public/config.js */
const PREFIX_HOST_NAME = 'API_HOST'
const WRITE_PATH = '/src/base'

function writeFile (filepath, filename, content) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath, { recursive: true })
  }
  fs.writeFileSync(path.resolve(filepath, `${filename}`), content, { encoding: 'utf8' })
}

function beautifyJs (content) {
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
    space_after_anon_function: true
  })
}

console.log('\nGenerating Codes...')
const apiCollection = []

/* Read templates */
const apiFiles = fs.readdirSync(path.resolve(__dirname, 'api-schemas'))
apiFiles.forEach(filename => {
  apiCollection.push({
    filename,
    apiList: require(`./api-schemas/${filename}`)
  })
})

apiCollection.forEach(n => {
  /* Write API */
  writeFile(path.resolve(__dirname, `..${WRITE_PATH}/api`), n.filename, beautifyJs(apiRender({
    PREFIX_HOST_NAME,
    apiList: n.apiList
  })))

  /* Write Mixins */
  // TODO
})

console.log('Generate Codes Completed.\n')
