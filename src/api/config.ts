import { AxiosRequest } from '@/utils/request/axios'
import type { ConfigType } from '@/typings/config'

/**
 * 配置API
 */
class ConfigApi extends AxiosRequest {
  /**
   * 系统配置
   */
  siteConfig() {
    return this.get<ConfigType.Site>('/api/system/site-config')
  }

  /**
   * 获取指定配置
   * @param key 配置键
   */
  getConfig<T>(key: string) {
    return this.get<T>('/api/config', { key }, true)
  }

  /**
   * 更新配置
   * @param params 配置参数
   */
  update(params: any) {
    return this.put('/api/config', params)
  }
}

export const useConfigApi = new ConfigApi()
