import BaseEmitter from './base'

const eventNameList = [
  'API:BAD-REQUEST', // 请求错误
  'API:NOT-FOUND', // 未找到
  'API:INTERNAL-SERVER-ERROR', // 服务器错误
  'API:LOGIN-EXPIRED', // 登录过期
  'API:NOT-INSTALL', // 未安装
  'API:NOT-LOGIN', // 未登录
  'API:UNAUTHORIZED', // 未授权
  'API:NETWORK-ERROR', // 网络错误
  'API:UNKNOWN-ERROR', // 未知错误
  'API:TIMEOUT-ERROR', // 超时错误
  'API:RESPONSE-ERROR' // 响应错误
] as const
type EventNames = (typeof eventNameList)[number]

class apiEmitter extends BaseEmitter<EventNames> {
  constructor() {
    super([...eventNameList])
  }
}

export const ApiEmitter = new apiEmitter()
