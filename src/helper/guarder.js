/**
 * Router guarder (Hooks)
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.inc(0.2)
NProgress.configure({ showSpinner: false })

export default function (router) {
  router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
  })

  router.afterEach((to, from) => {
    NProgress.done()
  })
}
