import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayoutVue from '@/layout/DefaultLayout.vue'
import { orderRoute } from './order'
import { authRoute } from './auth'
import { productRoute } from './product'
import { newsRoute } from './news'
import { categoryRoute } from './category'
import { accountRoute } from './account'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...orderRoute,
    ...authRoute,
    ...productRoute,
    ...newsRoute,
    ...accountRoute,
    ...categoryRoute,
    {
      path: '/',
      name: 'home',
      meta: {
        layout: DefaultLayoutVue,
        requiresAuth: true
      },
      component: () => import('@/pages/HomeView.vue')
    }
  ]
})

export default router
