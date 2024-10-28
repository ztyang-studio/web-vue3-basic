import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import setupPageGuard from './page'
import setupLoginGuard from './login'
// import setupPermissionGuard from './permission'

export default function createRouteGuard(router: Router) {
  NProgress.start()
  // 页面守卫
  setupPageGuard(router)

  // 登录守卫
  setupLoginGuard(router)

  // setupPermissionGuard(to, from, next)
  NProgress.done()
}
