const fs = require('fs')
const path = require('path')
// const { execSync } = require('child_process')
const { log, writeFile, beautifyJs } = require('./utils')

const apiRender = require('./templates/api')
const mixinRender = require('./templates/mixin')

/* API_HOST states in public/config.js */
const PREFIX_HOST_NAME = 'API_HOST'
const WRITE_PATH = '/src/base'

console.log('\nGenerating Codes...')
const apiCollection = []

/* Read templates */
const apiFiles = fs.readdirSync(path.resolve(__dirname, 'api-schemas'))
apiFiles.filter(n => n !== '.gitkeep').forEach(filename => {
  const apiList = require(`./api-schemas/${filename}`)
  if (!Array.isArray(apiList)) throw new Error(`The type to export must be an Array. (${filename})`)
  apiCollection.push({
    filename,
    apiList
  })
})

apiCollection.forEach(n => {
  /* Write API */
  writeFile(path.resolve(__dirname, `..${WRITE_PATH}/api`), n.filename, beautifyJs(apiRender({
    PREFIX_HOST_NAME,
    apiList: n.apiList
  })))

  /* Write Mixins */
  writeFile(path.resolve(__dirname, `..${WRITE_PATH}/mixin`), n.filename, beautifyJs(mixinRender({
    // PREFIX_HOST_NAME,
    filename: n.filename.replace('.js', '')
    // apiList: n.apiList
  })))
})

// execSync('eslint src/base/** --fix')

log('green', 'Generate Codes Completed.\n')
