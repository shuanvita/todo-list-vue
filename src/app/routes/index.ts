import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'dashboard',
    path: '/',
    component: () => import('@/pages/dashboard'),
  },
  {
    name: 'tasks',
    path: '/tasks',
    component: () => import('@/pages/tasks'),
  },
  {
    name: 'calendar',
    path: '/calendar',
    component: () => import('@/pages/calendar'),
  },
  {
    name: 'saved',
    path: '/saved',
    component: () => import('@/pages/saved'),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('@/pages/settings'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
