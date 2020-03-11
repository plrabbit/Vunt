/**
 * CDN resources configuration
 */

/* Decide if you want to use CDN */
const useCDN = true

const sourcesCDN = {
  useCDN,
  /* webpack externals */
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  /* css assets on CDN */
  css: [],
  /* js assets on CDN */
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.2/index.min.js'
  ]
}

module.exports = sourcesCDN
