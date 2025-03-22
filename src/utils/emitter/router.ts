import BaseEmitter from './base'

const routeEventNames = ['ROUTE:CHANGE'] as const
type EventNames = (typeof routeEventNames)[number]

/**
 * 单独监听路由会浪费渲染性能。使用发布订阅模式去进行分发管理。
 */
class routerEmitter extends BaseEmitter<EventNames> {
  constructor() {
    super([...routeEventNames])
  }
}

export const RouterEmitter = new routerEmitter()
