const _import = require('@/utils/view-import/' + process.env.NODE_ENV)

export default [
  {
    path: '*',
    component: _import('Exception/404')
  },
  {
    path: '/',
    component: _import('Index'),
    redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: _import('Home')
      },
      {
        path: '/About',
        name: 'About',
        component: _import('About')
      }
    ]
  }
]
