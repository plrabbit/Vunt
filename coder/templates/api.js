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
  return axios({
    <% const method = api.options.method.toLowerCase() %>
    <% if ( method === 'get' || method === 'delete' ) { %>
      params: data<%if(api.options){%>,<%}%>
    <% } else { %>
      data<%if(api.options){%>,<%}%>
    <% } %>
    <%if(api.options){%>
      <% for (let [key, value] of Object.entries(api.options)) { %>
        <% if (['params', 'data', 'url'].includes(key)) { continue %>
        <% } else { %>
          <%=key%>: <%if(typeof value=='string'){%> '<%=value%>' <%}else{%> <%=JSON.stringify(value).replace(/"(\\w+)":/g, '$1:').replace(/"/g, '\\'')%> <%}%>,
        <%}%>
      <%}%>
    <%}%>
    url: <%= PREFIX_HOST_NAME %> + \`<%= arrangedPath %>\`
  })
}
<% }) %>
`)
