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
  },
  {
    path: '/manage-product/update/:slug',
    name: 'UpdateProduct',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/product/update/UpdateProductPage.vue')
  },
  {
    path: '/manage-product/detail/:slug',
    name: 'DetailProduct',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/product/detail/DetailProductPage.vue')
  }
]
