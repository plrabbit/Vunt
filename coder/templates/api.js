const _ = require('lodash')

module.exports = _.template(`
import axios from '@/helper/axios'

import { <%= PREFIX_HOST_NAME %> } from '@/config'

<% _.each(apiList, function (api) { %>
/** <%= api.desc %> */
<% const reg = /\\/(?::(\\w+))(?=\\/|$)|\\/(?:{(\\w+)})(?=\\/|$)/g %>
<% let arr = [] %>
<% let arrangedPath = api.path + '' %>
<% while (true) { %>
<%   let str = reg.exec(api.path) %>
<%   if (str) { %>
<%     arr.push(str[1] ? str [1] : str[2]) %>
<%     arrangedPath = arrangedPath.replace(str[1] ? new RegExp(\`:\${str[1]}\`) : new RegExp(\`{\${str[2]}}\`), '\${' + (str[1] ? str[1] : str[2]) + '}') %>
<%   } else { %>
<%     break %>
<%   } %>
<% } %>
<% const hasPathParams = reg.test(api.path) %>
<% let arrSet = new Set(arr) %>
<% if (arrSet.size !== arr.length) { %>
<%   throw new Error('Duplicated params in \\'' + api.name + '\\' function.') %>
<% } %>
export const <%= api.name %> = function (data<%if (hasPathParams) { %>, pathParams<% } %>) {
  <%if (hasPathParams) { %>const { <%= arr.join(', ') %> } = pathParams<% } %>
  return axios(<%= PREFIX_HOST_NAME %> + \`<%= arrangedPath %>\`, {
    <% const method = api.options.method.toLowerCase() %>
    <% if ( method === 'get' || method === 'delete' ) { %>
      params: data
    <% } else { %>
      data
    <% } %>
  })
}
<% }) %>
`)
