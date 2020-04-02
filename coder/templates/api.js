const _ = require('lodash')
const utils = require('./utils')

module.exports = _.template(`
import axios from '@/helper/axios'

import { <%= PREFIX_HOST_NAME %> } from '@/config'

<% const funcNameList = {} %>
<% let hasRest = false %>
<% _.each(apiList, function (api) { %>
  <% if (!validateName(api.name)) throw new Error(\`Invalid name "\${api.name}"\`) %>
  <% if (funcNameList[api.name] === undefined) { %>
  <% funcNameList[api.name] = '1' %>
  <% } else { %>
  <% throw new Error(\`Duplicated function name "\${api.name}"\`) %>
  <% } %>
  <% if (api.rest) hasRest = true %>

  <% const pathInfo = getPathParams(api.path) %>
  <% if (!pathInfo) throw new Error(\`Invalid API path in "\${api.name}" function!\`) %>
  <% const { pathParams, arrangedPath } = pathInfo %>
  <% if (!validateDuplicatedPathParams(pathParams)) throw new Error(\`Duplicated path parameters in "\${api.name}" function!\`) %>

  <% const hasPathParams = pathParams.length > 0 %>
  /**
   * <%= api.desc %>
   <%if (api.rest) { %>* @param {string} method<% } %>
   <%if (hasPathParams) { %>* @param {object} pathParams<% } %>
   * @param {object} data/params
   * @returns {promise}
   */
  export const <%= api.name %> = function (<%if (api.rest) { %>method, <% } %><%if (hasPathParams) { %>pathParams = {}, <% } %>data = {}) {
    <% if (hasPathParams) { %>const { <%= pathParams.join(', ') %> } = pathParams<% } %>
    <% if (api.rest) { %>if (!validateMethod(method)) throw new Error('Invalid method parameter!')<% } %>
    <% if (api.rest) { %>let<% } else { %>const<% } %> config = {
      <% const method = api.options && api.options.method %>
      <% if (!validateMethod(method) && method !== undefined && !api.rest) throw new Error(\`Invalid method in "\${api.name}" function!\`) %>
      <% if (!api.rest) { %>
        <% if (method === undefined || method === 'get' || method === 'delete') { %>
          params: data,
        <% } else { %>
          data,
        <% } %>
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
      url: <%= PREFIX_HOST_NAME %> + <% if (pathParams.length) { %>\`<%= arrangedPath %>\`<% } else { %>'<%= arrangedPath %>'<% } %>,
      _funcName: '<%= api.name %>'
    }
    <% if (api.rest) { %>
    config = injectData(config, data)
    <% } %>
    return axios(config)
  }
<% }) %>

<% if (hasRest) { %>
/** ------------------ Utils ------------------- */

/** Validate Method */
const validateMethod = <%= validateMethod %>

/** Inject data to config */
const injectData = function (config, data) {
  if (/^(get|delete)$/i.test(config.method) || config.method === undefined) {
    config = Object.assign({}, config, { params: data })
  } else {
    config = Object.assign({}, config, { data })
  }
  return config
}
<% } %>
`, {
  imports: utils
})
