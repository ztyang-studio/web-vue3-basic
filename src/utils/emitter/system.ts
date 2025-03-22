import BaseEmitter from './base'

const eventNameList = [
  'SYSTEM:SITE-FAILED', // 获取站点配置失败
  'SYSTEM:SITE-SUCCESS' // 获取站点配置成功
] as const
type EventNames = (typeof eventNameList)[number]

class systemEmitter extends BaseEmitter<EventNames> {
  constructor() {
    super([...eventNameList])
  }
}

export const SystemEmitter = new systemEmitter()
