const _import = file => import('@/views/' + file + '.vue')

export default [
  {
    path: '/',
    component: () => _import('index'),
    children: [
      {
        path: '/about',
        component: () => _import('about')
      }
    ]
  }
]
