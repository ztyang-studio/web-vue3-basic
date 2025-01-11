import { UserGender } from '@/enum/user'

export namespace UserType {
  export type User = {
    authn: string
    avatar: string
    create_time: number
    delete_time: number
    description: string
    email: string
    gender: UserGender
    group: Group
    id: number
    login_time: number
    nickname: string
    open_id: string
    phone: string
    score: number
    status: number
    storage: number
    uid: string
    update_time: number
  }

  export type Group = {
    id: number
    gid: string
    name: string
  }

  export type UserLoginInfo = {
    user: User
    token: string
  }

  export type JwtData = {
    exp: number
    iat: number
    iss: string
    sub: string
    data: {
      gid: string
      uid: string
    }
  }
}
