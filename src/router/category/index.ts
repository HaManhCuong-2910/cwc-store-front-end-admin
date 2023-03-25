import DefaultLayoutVue from '@/layout/DefaultLayout.vue'
export const categoryRoute = [
  {
    path: '/manage-category',
    name: 'ManageCategory',
    meta: {
      layout: DefaultLayoutVue,
      transition: 'slide-fade',
      requiresAuth: true
    },
    component: () => import('@/pages/category/ManageCategoryPage.vue')
  }
]
