import type { AxiosProgressEvent } from 'axios'
import { AxiosRequest } from '@/utils/request/axios'

/**
 * 文件API
 */
class FileApi extends AxiosRequest {
  /**
   * 简单上传
   * @param file 文件对象
   * @param path 文件路径
   * @param name 文件名字
   */
  uploadFile(
    file: File,
    path?: string,
    name?: string,
    handleUpload?: (progressEvent: AxiosProgressEvent) => void
  ) {
    const formData = new FormData()
    formData.append('file', file)
    path && formData.append('path', path)
    name && formData.append('name', name)
    return this.upload('/api/admin/base/file/upload', formData, true, handleUpload)
  }
}

export const useFileApi = new FileApi()
