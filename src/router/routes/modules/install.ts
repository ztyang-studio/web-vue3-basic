import type { RouteRecordRaw } from 'vue-router'

const INSTALL_ROUTES: RouteRecordRaw[] = [
  {
    path: '/install',
    name: 'Install',
    meta: {
      title: '安装引导'
    },
    component: () => import('@/views/install/index.vue')
  }
]

export default INSTALL_ROUTES
