const _ = require('lodash')
const utils = require('./utils')

module.exports = _.template(`
import * as func from '@/base/api/<%= filename %>'

export default {
  beforeCreate () {
    this.$api = Object.assign(this.$api ? this.$api : {}, func)
  }
}
`, {
  imports: utils
})
