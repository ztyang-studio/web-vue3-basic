<template>
  <a-tabs
    class="header-tabs-wrap"
    editable
    :active-key="activeKey"
    @tab-click="methods.clickTab"
    @delete="methods.removeTab"
  >
    <a-tab-pane v-for="(item, index) in tabRoute" :closable="!item.meta.fixed" :key="index">
      <template #title>
        <div class="flex-yc g-5">
          <IconFont :name="item.meta.icon as string" class="mr-1" />
          <span class="no-select"> {{ item.meta.title }}</span>
        </div>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import ADMIN_ROUTES from '@/router/routes/modules/admin'
import type { RouteRecordRaw, RouteRecordNameGeneric } from 'vue-router'
import { listenerRouteChange } from '@/utils/emitter/router'

interface TabRoute {
  name?: RouteRecordNameGeneric
  meta: Record<string, any>
  params?: Record<string, any>
}

const route = useRoute()
const router = useRouter()
const tabRoute = ref<TabRoute[]>([])
const curentRoute = ref()
const routeList = Helper.array.flat(ADMIN_ROUTES[0].children || [])

const activeKey = computed(() => {
  return tabRoute.value.findIndex((item) => item.name === curentRoute.value)
})

const methods = {
  initTabs: () => {
    curentRoute.value = route.name
    ;[...routeList].reverse().forEach((route) => {
      if (route.meta?.fixed) {
        tabRoute.value.unshift({
          name: route.name,
          meta: route.meta
        })
      }
    })
  },
  removeTab: (index: number | string) => {
    const delName = tabRoute.value[Number(index)].name
    tabRoute.value.splice(Number(index), 1)
    if (route.name === delName) {
      router.push(tabRoute.value[Number(index) - 1])
    }
  },
  clickTab: (index: number | string) => {
    const route = tabRoute.value[Number(index)]
    router.push({ name: route.name!!, params: route.params })
  }
}

listenerRouteChange((newRoute) => {
  const hasRoute = tabRoute.value.find((item) => item.name === newRoute.name)
  if (!hasRoute && !newRoute.meta.fixed) {
    tabRoute.value.push({ ...newRoute })
  }
  curentRoute.value = newRoute.name
})

methods.initTabs()
</script>

<style lang="scss">
.header-tabs-wrap {
  .arco-tabs-tab {
    height: 35px;
    margin: 0 15px;
    transition: all 0.3s;

    &.arco-tabs-tab-active {
      padding: 0 20px;
      background-color: rgba($theme-color, 0.1);
      -webkit-mask: url('/static/images/comm/tabmask.png');
      mask: url('/static/images/comm/tabmask.png');
      -webkit-mask-size: 100% 100%;
      mask-size: 100% 100%;
    }

    &:hover {
      color: var(--theme-color);
      .arco-tabs-tab-close-btn {
        display: block;
      }
    }

    .arco-tabs-tab-title {
      &::before {
        display: none;
      }
    }
  }

  .arco-tabs-nav-ink {
    display: none;
  }
}
</style>
