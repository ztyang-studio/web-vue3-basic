import type { AxiosInstance } from 'axios'
import { ApiEmitter } from '@/utils/emitter/api'

export const resInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      const { msg = '未知错误!' } = response.data
      switch (response.data.code) {
        case 400:
          ApiEmitter.emit('API:BAD-REQUEST', msg) // 错误请求
        case 401:
          ApiEmitter.emit('API:LOGIN-EXPIRED') // 登录过期
          break
        case 402:
          ApiEmitter.emit('API:NOT-LOGIN') // 未登录
          break
        case 403:
          ApiEmitter.emit('API:UNAUTHORIZED') // 未授权
        case 404:
          ApiEmitter.emit('API:NOT-FOUND', msg) // 未找到
          break
        case 412:
          ApiEmitter.emit('API:NOT-INSTALL') // 未安装
          break
        case 500:
          ApiEmitter.emit('API:INTERNAL-SERVER-ERROR') // 服务器错误
          break
      }
      return response.data
    },
    (error) => {
      // 响应错误
      ApiEmitter.emit('API:RESPONSE-ERROR', error.response?.data?.msg || error.message)
      return {
        code: -1,
        msg: error.response?.data?.msg || error.message
      }
    }
  )
}
