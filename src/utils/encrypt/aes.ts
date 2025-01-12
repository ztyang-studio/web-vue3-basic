import CryptoJS from 'crypto-js'

/**
 * AES对称加密
 */
export class AES {
  iv: any
  key: any

  constructor(key: string, iv: string) {
    this.iv = CryptoJS?.enc.Utf8.parse(iv)
    this.key = CryptoJS?.enc.Utf8.parse(key)
  }

  // 加密
  encrypt(text: string) {
    let encrypted = CryptoJS?.AES.encrypt(text, this.key, {
      iv: this.iv,
      mode: CryptoJS?.mode.CBC,
      padding: CryptoJS?.pad.Pkcs7
    })
    return encrypted.toString()
  }

  // 解密
  decrypt(text: string) {
    let decrypted = CryptoJS?.AES.decrypt(text, this.key, {
      iv: this.iv,
      mode: CryptoJS?.mode.CBC,
      padding: CryptoJS?.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS?.enc.Utf8)
  }
}
