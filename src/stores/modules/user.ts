import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { UserEmitter } from '@/emitter'
import type { UserType } from '@/typings/user'
// import dayjs from 'dayjs'

export const useUserStore = defineStore('userStore', {
  state: (): Partial<UserType.UserLoginInfo> => ({
    token: undefined,
    user: undefined
  }),

  getters: {
    // role: (state) => {
    //   if (state.token) {
    //     const payload = jwtDecode<UserType.JwtHeader>(state.token)
    //     return payload.data.role
    //   } else return undefined
    // },
    hasLogin: (state) => state.token !== undefined
  },

  actions: {
    init() {
      if (!this.token) {
        this.$reset()
        UserEmitter.emit('USER:NOT-LOGIN')
      } else {
        const payload = jwtDecode<UserType.JwtData>(this.token)
        if (payload.exp < Date.now()) {
          BaseMsg.error('登录过期，请重新登录')
          this.$reset()
          UserEmitter.emit('USER:LOGIN-EXPIRE')
        }
      }
    },

    setUserInfo(data: UserType.UserLoginInfo) {
      this.$patch(data)
    },

    async logout() {
      this.$reset()
    }
  },

  persist: [
    {
      key: 'LOGIN-USER',
      pick: ['user', 'token'],
      storage: localStorage
    }
  ]
})
