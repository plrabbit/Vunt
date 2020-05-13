// type === 0 route
// type === 1 link
export default [
  {
    key: 1,
    type: 0,
    text: 'Components',
    icon: 'team',
    path: '/',
    children: [
      {
        key: 101,
        type: 0,
        text: 'Home',
        path: '/'
      },
      {
        key: 102,
        type: 0,
        text: 'About',
        path: '/about'
      }
    ]
  },
  {
    key: 2,
    type: 0,
    text: 'Exception Page',
    icon: 'deployment-unit',
    path: '/404'
  }
]
