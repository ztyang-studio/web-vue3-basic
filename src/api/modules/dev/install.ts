/**
 * 安装引导API
 */
class InstallApi {
  /**
   * 检查安装锁
   */
  check() {
    return request.get<DevType.Check>('/dev/install/check')
  }

  /**
   * 删除数据库配置文件
   */
  remove() {
    return request.delete('/dev/install/rm-db-config')
  }

  /**
   * 连接数据库
   */
  connect<T>(params: any) {
    return request.post<T>('/dev/install/connect-db', params)
  }

  /**
   * 初始化数据库
   */
  init() {
    return request.post('/dev/install/init-db')
  }

  /**
   * 创建管理员账户
   */
  admin(params: any) {
    return request.put('/dev/install/create-admin', params)
  }
}

export const useInstallApi = new (Helper.comm.singleton(InstallApi))()
