import router from '@/router'
import { inject } from 'vue'
import { useCookies } from 'vue3-cookies'

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && to.path !== '/auth/login') {
    const { cookies } = useCookies()
    const access_token = cookies.get('access_token')
    if (!access_token) {
      next({ name: 'LoginPage' })
    }
    next()
  } else {
    next()
  }
})
