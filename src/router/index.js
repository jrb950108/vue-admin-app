import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { initRouterMap } from './routes'
import { getToken } from '@/lib/util'

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  mode: 'history',
  routes: initRouterMap
  // base: process.env.BASE_URL
})

const router = createRouter()

// 重置路由
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

const MAIN_NAME = 'app' // 主路由name

const LOGIN_NAME = 'login' // 登录路由name

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = getToken()

  if (!token) {
    // token不存在
    if (to.name === LOGIN_NAME) {
      // 未登录且要跳转的页面是登录页
      next()
    } else {
      // 未登录且要跳转的页面不是登录页,则跳转到登录页
      next({ name: LOGIN_NAME })
    }
    // 重置路由实例 防止重复路由警告
    resetRouter()
  } else {
    // token存在
    if (to.name === LOGIN_NAME) {
      next({ name: MAIN_NAME })
      NProgress.done()
    } else {
      const hasGetInfo = store.state.user.hasGetInfo
      if (hasGetInfo) {
        next()
      } else {
        store.dispatch('getUserInfo').then(res => {
          next({ ...to, replace: true })
        }).catch(() => {
          next({ name: LOGIN_NAME })
        })
      }
    }
  }
})

router.afterEach(to => {
  NProgress.done()
  // window.scrollTo(0, 0)
})

export default router
