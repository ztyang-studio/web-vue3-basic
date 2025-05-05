import { useRouter } from 'vue-router'
import { SystemEmitter, ApiEmitter, RouterEmitter } from '@/utils/emitter'

export const useEventEmitter = () => {
  const router = useRouter()
  const userStore = useUserStore()

  // api 响应错误
  ApiEmitter.on('API:RESPONSE-ERROR', (msg: string) => {
    BaseMsg.error(msg)
  })

  // api 请求错误
  ApiEmitter.on('API:BAD-REQUEST', (msg: string) => {
    BaseMsg.error(msg)
  })

  // api 未找到
  ApiEmitter.on('API:NOT-FOUND', (msg: string) => {
    BaseMsg.error(msg)
  })

  // api 请求错误
  ApiEmitter.on('API:INTERNAL-SERVER-ERROR', () => {
    BaseMsg.error('服务器错误!')
  })

  // 获取系统配置失败 - 无服务
  SystemEmitter.on('SYSTEM:SITE-FAILED', () => {
    router.replace({ name: 'no-service' })
  })

  RouterEmitter.on('ROUTE:CHANGE', () => {
    userStore.init()
  })

  onBeforeUnmount(() => {
    ApiEmitter.clear()
    RouterEmitter.clear()
  })
}
