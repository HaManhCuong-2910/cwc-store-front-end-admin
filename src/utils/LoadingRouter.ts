import router from '@/router/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  const documentRoute: any = document

  // set page title
  documentRoute.title = to.meta.title ? to.meta.title : 'CWC Store Admin'
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
