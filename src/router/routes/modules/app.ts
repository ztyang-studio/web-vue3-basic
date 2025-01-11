import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/layouts/admin/index.vue'

const ADMIN_ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Admin',
    component: AdminLayout,
    redirect: { name: 'dashboard' },
    meta: { needLogin: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/dashboard/index.vue'),
        meta: { title: '控制台', icon: 'dashboard-3-fill', fixed: true }
      },
      {
        path: 'system',
        name: 'system',
        meta: { title: '系统管理', icon: 'settings-4-fill' },
        redirect: { name: 'admin-system-site' },
        children: [
          {
            path: 'site',
            name: 'system-site',
            component: () => import('@/views/admin/system/site/index.vue'),
            meta: { title: '站点信息', icon: 'slack-line' }
          },
          {
            path: 'icon',
            name: 'admin-system-icon',
            component: () => import('@/views/admin/system/icon/index.vue'),
            meta: { title: '系统图标', icon: 'album-line' }
          },
          {
            path: 'log',
            name: 'system-log',
            component: () => import('@/views/admin/system/log/index.vue'),
            meta: { title: '系统日志', icon: 'pencil-ruler-2-line' }
          }
        ]
      }
    ]
  }
]

export default ADMIN_ROUTES
