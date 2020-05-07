const _import = require('@/utils/view-import/' + process.env.NODE_ENV)

export default [
  {
    path: '/',
    name: 'Home',
    component: _import('Home')
  },
  {
    path: '/about',
    name: 'About',
    component: _import('About')
  }
]
