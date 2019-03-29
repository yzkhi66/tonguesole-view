import Vue from 'vue'
import Router, { Route } from 'vue-router'
import Home from './views/Home.vue'
import auth from './libs/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  beforeEach(to, from, next)
})

export function beforeEach (to: Route, from: Route, next: any): void {
  if (to.meta.auth) {
    // 需要身份验证
    if (!auth.getToken()) {
      // 未通过身份验证,跳转到登录页
      next({
        path: '/login'
      })
      return
    }
  }
  next()
}

export default router
