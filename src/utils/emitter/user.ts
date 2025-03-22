import BaseEmitter from './base'

const eventNameList = [
  'USER:NOT-LOGIN', // 未登录
  'USER:LOGIN-EXPIRE' // 登录过期
] as const
type EventNames = (typeof eventNameList)[number]

class userEmitter extends BaseEmitter<EventNames> {
  constructor() {
    super([...eventNameList])
  }
}

export const UserEmitter = new userEmitter()
