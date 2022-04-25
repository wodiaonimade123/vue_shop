import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
    children: [
      {
        path: '/users',
        component: () => import('@/views/home/users')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = store.state.myToken
  if (to.name != 'login' && !token) {
    next('/login')
    return
  }
  if (to.name == 'login' && token) {
    next('/home')
    return
  }
  next()
})

export default router
