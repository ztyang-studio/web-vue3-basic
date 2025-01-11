import { AxiosRequest } from '@/utils/request/axios'

/**
 * 安装引导API
 */
class InstallApi extends AxiosRequest {
  /**
   * 连接数据库
   */
  connect(params: any) {
    return this.post('/api/install/connect-db', params)
  }

  /**
   * 创建管理员账户
   */
  createAdmin(params: any) {
    return this.post('/api/install/create-admin', params)
  }
}

export const useInstallApi = new InstallApi()
