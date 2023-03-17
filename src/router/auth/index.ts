import LoginLayout from '@/layout/LoginLayout.vue'
export const authRoute = [
  {
    path: '/auth/login',
    name: 'LoginPage',
    meta: {
      layout: LoginLayout,
      requiresAuth: true
    },
    component: () => import('@/pages/auth/LoginPage.vue')
  }
]
