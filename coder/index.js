const fs = require('fs')
const path = require('path')
// const { execSync } = require('child_process')
const { log, writeFile, beautifyJs } = require('./utils')

const apiRender = require('./templates/api')

/* API_HOST states in public/config.js */
const PREFIX_HOST_NAME = 'API_HOST'
const WRITE_PATH = '/src/base'

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

// execSync('eslint src/base/** --fix')

log('green', 'Generate Codes Completed.\n')
