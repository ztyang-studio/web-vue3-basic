import type { UserType } from '@/typings/user'
import { AxiosRequest } from '@/utils/request/axios'

/**
 * 用户API
 */
class UserApi extends AxiosRequest {
  /**
   * 用户登录
   * @param email 邮箱
   * @param password 密码
   */
  login(email: string, password: string) {
    return this.post<UserType.UserLoginInfo>('/api/user/login', { email, password }, false)
  }
}

export const useUserApi = new UserApi()
