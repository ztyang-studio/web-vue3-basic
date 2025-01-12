import CryptoJS from 'crypto-js'

/**
 * 创建唯一id
 * @returns {string}
 */
export const uuid = () => {
  const crypto = window.crypto
  const randomValues = new Uint8Array(16)
  crypto.getRandomValues(randomValues)

  randomValues[6] = (randomValues[6] & 0x0f) | 0x40 // Version 4
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80 // Variant 10

  const hexArray = Array.from(randomValues, (byte) => byte.toString(16).padStart(2, '0'))
  const uuidValue = [
    hexArray.slice(0, 4).join(''),
    hexArray.slice(4, 6).join(''),
    hexArray.slice(6, 8).join(''),
    hexArray.slice(8, 10).join(''),
    hexArray.slice(10, 16).join('')
  ].join('-')

  return uuidValue
}

/**
 * 生成指定长度的加密字符串
 * @param value 字符串值
 * @param length 长度
 * @param prefix 前缀
 */
const token = (value = '', length = 32, prefix = '') => {
  // 计算MD5哈希值
  const MD5Hash = CryptoJS.MD5(prefix + value).toString()

  let result = MD5Hash.substring(0, length)

  // 计算 result 长度是否满足要求
  while (result.length < length) {
    result += token(result, length - result.length)
  }

  return result
}
