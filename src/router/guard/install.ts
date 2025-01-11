import type { Router, RouteRecordNormalized } from 'vue-router'
import { ApiEmitter } from '@/emitter'

const isInstall = ref(true)

ApiEmitter.on('API:NOT-INSTALL', () => {
  isInstall.value = false
})

export default function setupInstallGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (!isInstall.value) {
      if (to.name === 'Install') next()
      else next({ name: 'Install' })
    } else {
      if (to.name === 'Install') next({ name: 'Admin' })
      else next()
    }
  })
}
