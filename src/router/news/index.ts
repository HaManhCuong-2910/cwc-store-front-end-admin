import DefaultLayoutVue from '@/layout/DefaultLayout.vue'
export const newsRoute = [
  {
    path: '/manage-news',
    name: 'ManageNews',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/news/ManageNewsPage.vue')
  },
  {
    path: '/manage-news/create',
    name: 'CreateNews',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/news/create/CreateNewsPage.vue')
  },
  {
    path: '/manage-news/update/:id',
    name: 'UpdateNews',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/news/update/UpdateProductPage.vue')
  },
  {
    path: '/manage-news/detail/:id',
    name: 'DetailNews',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/news/detail/DetailNewsPage.vue')
  }
]
