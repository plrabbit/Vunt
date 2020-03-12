const _import = file => import('@/views/' + file + '.vue')

module.exports = [
  {
    path: '/',
    name: 'Home',
    component: () => _import('Home')
  },
  {
    path: '/about',
    name: 'About',
    component: () => _import('About')
  }
]
