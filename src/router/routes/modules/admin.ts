import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/layouts/admin/index.vue'

const ADMIN_ROUTES: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminLayout,
    redirect: { name: 'admin-dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/system/dashboard/index.vue'),
        meta: { title: '控制台', icon: 'dashboard-3-fill', permission: 1, fixed: true }
      },
      {
        path: 'system',
        name: 'admin-system',
        meta: { title: '系统管理', icon: 'settings-4-fill' },
        redirect: { name: 'admin-system-site' },
        children: [
          {
            path: 'site',
            name: 'admin-system-site',
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
            name: 'admin-system-log',
            component: () => import('@/views/admin/system/log/index.vue'),
            meta: { title: '系统日志', icon: 'pencil-ruler-2-line' }
          }
        ]
      }
    ]
  }
]

export default ADMIN_ROUTES
