const _ = require('lodash')
const utils = require('./utils')

module.exports = _.template(`
import * as func from '@/base/api/<%= filename %>'

export default {
  created () {
    this.$api = Object.assign(this.$api || {}, func)
  }
}
`, {
  imports: utils
})
