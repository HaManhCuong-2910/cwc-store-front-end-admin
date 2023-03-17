import DefaultLayoutVue from '@/layout/DefaultLayout.vue'
export const orderRoute = [
  {
    path: '/manage-order/list-order',
    name: 'OrderDelivery',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/order/OrderDeliveryPage.vue')
  },
  {
    path: '/manage-order/order-detail/:slug',
    name: 'OrderDetail',
    meta: {
      layout: DefaultLayoutVue,
      requiresAuth: true
    },
    component: () => import('@/pages/order/order-detail/OrderDetailView.vue')
  },
  {
    path: '/manage-order/list-cancel-order',
    name: 'ListCancelOrder',
    meta: {
      layout: DefaultLayoutVue,
      typeOrder: 'cancel',
      requiresAuth: true
    },
    component: () => import('@/pages/order/OrderDeliveryPage.vue')
  }
]
