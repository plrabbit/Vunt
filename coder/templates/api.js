const _ = require('lodash')

module.exports = _.template(`
import axios from '@/helper/axios'

import { <%= PREFIX_HOST_NAME %> } from '@/config'

<% _.each(apiList, function (api) { %>
/** <%= api.desc %> */
export const <%= api.name %> = function (data) {
  return axios(<%= PREFIX_HOST_NAME %> + '<%= api.path %>', {
    <% var method = api.options.method.toLowerCase() %>
    <% if ( method === 'get' || method === 'delete' ) { %>
      params: data
    <% } else { %>
      data
    <% } %>
  })
}
<% }) %>
`)
