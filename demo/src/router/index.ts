import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app-layout',
      component: AppLayout,
      children: [
        { path: '', name: 'home', component: HomeView }
      ]
    },
  ]
})

export default router
