import type { AxiosProgressEvent } from 'axios'

/**
 * 文件API
 */
class FileApi {
  /**
   * 简单上传
   * @param file 文件对象
   * @param path 文件路径
   * @param name 文件名字
   */
  upload(
    file: File,
    path?: string,
    name?: string,
    handleUpload?: (progressEvent: AxiosProgressEvent) => void
  ) {
    const formData = new FormData()
    formData.append('file', file)
    path && formData.append('path', path)
    name && formData.append('name', name)
    return request.upload<Type.Upload>('/api/admin/base/file/upload', formData, true, handleUpload)
  }
}

export const useFileApi = new (Helper.comm.singleton(FileApi))()
