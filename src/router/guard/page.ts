import { setRouteEmitter } from '@/utils/emitter/router'
import type { Router } from 'vue-router'

const title = import.meta.env.APP_TITLE
export default async function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // 发布路由跳转事件
    setRouteEmitter(to)
    // 设置页面标题
    document.title = to.meta?.title ? `${to.meta.title}-${title}` : title

    // 安装页面跳转
    // if (to.name === 'Install') {
    //   const { data } = await useInstallApi.check()
    //   if (data.install) {
    //     next({ name: 'Home' })
    //     return true
    //   }
    //   next()
    //   return true
    // }
  })
}
