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
  }
]
