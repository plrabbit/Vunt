/**
 * @type {array}
 * @property {string}   path      API path
 * @property {string}   desc      API description
 * @property {string}   name      Customize the function name
 * @property {boolean}  rest      Decide if generate RESTful API
 * @property {object}   options   Options for axios
 */
module.exports = [
  {
    path: '/home/blogArticles', // Will be generated: API_HOST + path
    desc: 'API for blog articles',
    name: 'blogArticles',
    rest: true,
    options: {
      method: 'get'
    }
  }
]
