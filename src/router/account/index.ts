import DefaultLayout from '@/layout/DefaultLayout.vue'
export const accountRoute = [
  {
    path: '/manage-account',
    name: 'ManageAccount',
    meta: {
      layout: DefaultLayout,
      transition: 'slide-fade',
      requiresAuth: true
    },
    component: () => import('@/pages/account/ManageAccountPage.vue')
  },
  {
    path: '/manage-account/create',
    name: 'CreateAccount',
    meta: {
      layout: DefaultLayout,
      requiresAuth: true
    },
    component: () => import('@/pages/account/create/CreateAccountPage.vue')
  },
  {
    path: '/manage-account/update/:id',
    name: 'UpdateAccount',
    meta: {
      layout: DefaultLayout,
      requiresAuth: true
    },
    component: () => import('@/pages/account/update/UpdateAccountPage.vue')
  },
  {
    path: '/manage-account/detail/:id',
    name: 'DetailAccount',
    meta: {
      layout: DefaultLayout,
      requiresAuth: true
    },
    component: () => import('@/pages/account/detail/DetailAccountPage.vue')
  }
]
