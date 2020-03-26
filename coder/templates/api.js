const _ = require('lodash')
const utils = require('./utils')

module.exports = _.template(`
import axios from '@/helper/axios'

import { <%= PREFIX_HOST_NAME %> } from '@/config'

<% const funcNameList = [] %>
<% _.each(apiList, function (api) { %>
  <% funcNameList.push(api.name) %>
  /** <%= api.desc %> */
  <% const { pathParams, arrangedPath } = getPathParams(api.path) %>

  <% handleDuplicatedPathParams(pathParams, api.name) %>

  <% const hasPathParams = pathParams.length > 0 %>
  export const <%= api.name %> = function (<%if (api.rest) { %>method, <% } %><%if (hasPathParams) { %>pathParams = {}, <% } %>data = {}) {
    <%if (hasPathParams) { %>const { <%= pathParams.join(', ') %> } = pathParams<% } %>
    return axios({
      <% const method = api.options.method.toLowerCase() %>
      <% if ( method === 'get' || method === 'delete' ) { %>
        params: data,
      <% } else { %>
        data,
      <% } %>
      <%if(api.options){%>
        <% for (let [key, value] of Object.entries(api.options)) { %>
          <% if (['params', 'data', 'url'].includes(key)) { continue %>
          <% } else { %>
            <% if (api.rest && key === 'method') {%>
              method,
            <% } else { %>
              <%= key %>: <% if(typeof value=='string'){ %> '<%= value %>' <% } else { %> <%= JSON.stringify(value).replace(/"(\\w+)":/g, '$1:').replace(/"/g, '\\'') %> <% } %>,
            <% } %>
          <% } %>
        <% } %>
      <% } %>
      url: <%= PREFIX_HOST_NAME %> + <% if (pathParams.length) { %>\`<%= arrangedPath %>\`<% } else { %>'<%= arrangedPath %>'<% } %>
    })
  }
<% }) %>

<% handleDuplicatedFunctionName(funcNameList) %>
`, {
  imports: utils
})
