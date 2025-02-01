import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authRequired, getUserData, noAuthRequired, rolePremission } from './guards'
import { REQUIRED_AUTH_STATUS } from './data'
import { useLoadingRouteStore } from '@/stores/loadingRoute'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/blog',
      name: 'BlogView',
      component: BlogView,
      props: true,
    },
    {
      path: '/blog/:id',
      name: 'BlogPostView',
      component: BlogPostView,
      props: true,
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
          path: '/dash',
          component: () => import('@/views/DashRootView.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/DashView.vue'),
              name: 'main-dash',
            },
            /// STATS
            {
              path: 'stats',
              component: () => import('@/views/StatsRootView.vue'),
              name: 'stats',
            },
            /// Reguired Admin role
            {
              path: '',
              meta: {
                roles: ['admin'],
              },
              children: [
                {
                  path: 'exercises',
                  children: [
                    {
                      path: '',
                      name: 'dash-exercises',
                      component: () => import('../views/AdminDash/MenageExercisesView.vue'),
                    },
                    {
                      path: 'add',
                      name: 'addExercise',
                      component: () => import('@/views/AdminDash/AddExerciseView.vue'),
                    },
                    {
                      path: ':id',
                      name: 'preview-exercise',
                      component: () => import('@/views/AdminDash/PreviewExerciseView.vue'),
                    },
                    {
                      path: 'edit/:id',
                      name: 'editExercise',
                      component: () => import('../views/AdminDash/EditExercisesView.vue'),
                    },
                  ],
                },

                /// POSTS
                {
                  path: 'posts',
                  children: [
                    {
                      path: '',
                      name: 'dash-posts',
                      component: () => import('../views/AdminDash/MenagePostsView.vue'),
                    },
                    {
                      path: 'add',
                      name: 'addPost',
                      component: () => import('../views/AdminDash/AddPostView.vue'),
                    },
                    {
                      path: 'editpost/:id',
                      name: 'editPost',
                      component: () => import('../views/AdminDash/EditPostView.vue'),
                    },
                  ],
                },
              ],
            },
            /// EXERCIESES
          ],
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/UserProfileView.vue'),
        },
        {
          path: 'workout/:id',
          name: 'workout',
          component: () => import('../views/WorkoutView.vue'),
        },
      ],
    },
    // Required NoAuth Route

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        auth: REQUIRED_AUTH_STATUS.get('noAuthRequired'),
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        auth: REQUIRED_AUTH_STATUS.get('noAuthRequired'),
      },
    },

    {
      path: '/notfound',
      component: () => import('../views/NotFoundView.vue'),
      name: 'notfound',
      beforeEnter: (_, from, next) => {
        if (from.matched.length === 0) next({ name: 'home' })
        next()
      },
    },
    { path: '/:pathMatch(.*)*', redirect: () => ({ name: 'home' }) },

    {
      path: '/blog/:category?',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
      props: true,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const loadingStatus = useLoadingRouteStore()
  try {
    loadingStatus.isLoading = true
    await getUserData()
    noAuthRequired(to)
    authRequired(to)
    rolePremission(to)
    next()
  } catch (e) {
    next({ name: e.name || '' })
  }
})

router.afterEach(() => {
  const loadingStatus = useLoadingRouteStore()

  loadingStatus.isLoading = false
})

export default router
