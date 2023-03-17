import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayoutVue from '@/layout/DefaultLayout.vue'
import { orderRoute } from './order'
import { authRoute } from './auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...orderRoute,
    ...authRoute,
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
