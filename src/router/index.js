import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authRequired, getUserData, noAuthRequired, rolePremission } from './guards'
import { REQUIRED_AUTH_STATUS } from './data'
import { useLoadingRouteStore } from '@/stores/loadingRoute'
import PreviewDashContent from '@/views/PreviewDashContent.vue'
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
          path: '/statistics',
          name: 'stats',
          component: () => import('../views/StatsView.vue'),
        },
        // Required Admin Role
        {
          path: '/dash',
          component: () => import('../views/AdminDashView.vue'),
          children: [
            {
              path: '',
              component: PreviewDashContent,
              name: 'main-dash',
            },
            /// EXERCIESES
            {
              path: 'exercises',
              name: 'dash-exercises',
              component: () => import('../views/MenageExercisesView.vue'),
            },
            /// POSTS
            {
              path: 'addpost',
              name: 'addPost',
              component: () => import('../views/AddPostView.vue'),
            },
            {
              path: 'editpost/:id',
              name: 'editPost',
              component: () => import('../views/EditPostView.vue'),
            },
            {
              path: 'posts',
              name: 'dash-posts',
              component: () => import('../views/MenagePostsView.vue'),
            },
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
    next({ name: e.next || '' })
  }
})

router.afterEach(() => {
  const loadingStatus = useLoadingRouteStore()

  loadingStatus.isLoading = false
})

export default router
