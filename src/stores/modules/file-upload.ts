import { defineStore } from 'pinia'
import { FileUploadStatus } from '@/enum/file'

type UploadFileItem = {
  uuid: string
  lastModified: number
  name: string
  size: number
  type: string
  webkitRelativePath: string
  status: FileUploadStatus
  hash?: string
  progress?: number
}

export const useFileUploadStore = defineStore('file-upload', {
  state: () => ({
    fileList: [] as UploadFileItem[]
  }),
  getters: {},
  actions: {
    // 添加文件
    addFiles(files: UploadFileItem[]) {
      this.fileList = this.fileList.concat(files)
      console.log('files', this.fileList)
    }
  }
  // persist: [
  //   {
  //     key: 'FILE-UPLOAD',
  //     storage: localStorage
  //   }
  // ]
})
