import type { RouteRecordRaw } from 'vue-router'

const TEST_ROUTES: RouteRecordRaw[] = [
  {
    path: '/test',
    name: 'Test',
    redirect: { name: 'login' },
    children: [
      {
        path: 'overlap',
        name: 'test-overlap',
        component: () => import('@/views/test/overlap/index.vue'),
        meta: { title: '干掉重叠' }
      }
    ]
  }
]

export default TEST_ROUTES
