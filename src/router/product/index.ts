import DefaultLayoutVue from '@/layout/DefaultLayout.vue'
export const productRoute = [
  {
    path: '/manage-product',
    name: 'ManageProduct',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/product/ManageProductPage.vue')
  },
  {
    path: '/manage-product/create',
    name: 'CreateProduct',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/product/create/CreateProductPage.vue')
  }
]
