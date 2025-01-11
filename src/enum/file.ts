// 文件上传状态
export enum FileUploadStatus {
  AWAITING = 0, // 等待
  UPLOADING = 1, // 上传中
  COMPELETE = 2, // 完成
  FAILED = 3, // 上传失败
  PAUSE = 4, // 已暂停
  CANCEL = 5, // 已取消
  EXPIRED = 6 // 已过期
}
