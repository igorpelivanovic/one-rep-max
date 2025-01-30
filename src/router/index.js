import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authRequired, getUserData, noAuthRequired, rolePremission } from './guards'
import { REQUIRED_AUTH_STATUS } from './data'
import { useLoadingRouteStore } from '@/stores/loadingRoute'

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
        {
          path: '/post',
          name: 'post',
          component: () => import('../views/PostView.vue'),
          meta: {
            roles: ['admin'],
          },
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/UserProfileView.vue'),
        },
        {
          path: '/workout/:id',
          name: 'workout',
          component: () => import('../views/WorkoutView.vue'),
        },
        {
          path: 'exercise/:workoutId/:exerciseId',
          name: 'exercise',
          component: () => import('../views/ExerciseView.vue'),
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
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/RegisterView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, _, next) => {
  const loadingStatus = useLoadingRouteStore()
  try {
    loadingStatus.isLoading = true
    await getUserData()
    noAuthRequired(to)
    authRequired(to)
    rolePremission(to)
    next()
  } catch (e) {
    next({ name: e.next || '' })
  }
})

router.afterEach(() => {
  const loadingStatus = useLoadingRouteStore()

  loadingStatus.isLoading = false
})

export default router
