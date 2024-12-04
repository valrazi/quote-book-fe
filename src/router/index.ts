import { createRouter, createWebHistory, type Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/User.vue'),
      redirect: () => {
        return {name: 'feed'}
      },
      children: [
        {
          name: 'feed',
          path: '/feed',
          component: () => import('../views/Feed.vue'),
          meta: {
            needAuth: true
          }
        },
        {
          name: 'feed-detail',
          path: '/feed-detail',
          component: () => import('../views/FeedDetail.vue'),
          meta: {
            needAuth: true
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
  ],
})

export const initMiddleware = (router: Router) => {
  router.afterEach(() => {
    window.scrollTo(0, 0)
  })
  router.beforeEach((to, _, next) => {
    const authStore = useAuthStore()
    if(to.meta.needAuth) {
      if(!authStore.token) {
        next({name:'login'})
      }else {
        next()
      }
    }else {
      next()
    }
  })
}

initMiddleware(router)

export default router
