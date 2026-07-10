import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'dashboard',
    path: '/',
    component: () => import('@/pages/dashboard'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
