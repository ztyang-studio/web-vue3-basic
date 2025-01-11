export namespace FileType {
  export type FileChunk = {
    blob: Blob
    hash: string
    offset: number
    size: number
  }

  export type FileUploadInfo = {
    file: File
    hash: string
    chunks: FileChunk[]
  }

  export type UploadFile = {
    name: string
    size: number
    hash?: string
    type?: string
    lastModified?: number
    webkitRelativePath?: string
  }

  export type UploadFolder = {
    name: string
    files?: UploadFile[]
  }
}
