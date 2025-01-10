import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authGuard } from './guards'
import { REQUIRED_AUTH_STATUS } from './data'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // Required Auth Route
    {
      path: '',
      meta: {
        auth: REQUIRED_AUTH_STATUS.get('authRequired'),
      },
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue'),
        },
      ],
    },
    // Required NoAuth Route
    {
      path: '',
      meta: {
        auth: REQUIRED_AUTH_STATUS.get('noAuthRequired'),
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(authGuard)

export default router
