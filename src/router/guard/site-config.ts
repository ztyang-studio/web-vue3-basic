import type { Router } from 'vue-router'

export default function setupSiteConfigGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const sysConfigStore = useSystemStore()
    if (!sysConfigStore.hasSystemConfig) {
      if (to.name === 'no-service') next()
      else next({ name: 'no-service' })
    } else {
      if (to.name === 'no-service') next({ name: 'Admin' })
      else next()
    }
  })
}
