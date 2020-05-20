// type === 0 route
// type === 1 link
export default [
  {
    key: 1,
    type: 0,
    text: 'Components',
    icon: 'home',
    path: '/',
    children: [
      {
        key: 101,
        type: 0,
        text: 'Home',
        path: '/Home'
      },
      {
        key: 102,
        type: 0,
        text: 'About',
        path: '/About'
      }
    ]
  },
  {
    key: 2,
    type: 0,
    text: 'Exception Page',
    icon: 'file-exclamation',
    path: '/404'
  }
]
