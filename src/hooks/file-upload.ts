import type { FileType } from '@/typings/file'
import ChunkFileWorker from '@/worker/file-chunk?worker'
import FileUploadWorker from '@/worker/file-upload?worker'
import { CHUNK_SIZE } from '@/constant/file'
import { THREAD_COUNT } from '@/constant/index'
import { FileUploadStatus } from '@/enum/file'
import { uuid } from '@/utils'

export const useFileUpload = () => {
  const fileUploadStore = useFileUploadStore()

  // 文件分片
  const ChunkFileList = (file: File): Promise<FileType.FileChunk[]> => {
    return new Promise((resolve) => {
      const chunks: Promise<FileType.FileChunk>[][] = []
      const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
      const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT)

      let finishCount = 0

      for (let i = 0; i < THREAD_COUNT; i++) {
        const worker = new ChunkFileWorker()
        const start = i * threadChunkCount
        const end = Math.min(start + threadChunkCount, chunkCount)

        worker.postMessage({ file, start, end, chunk_size: CHUNK_SIZE })
        worker.onmessage = (e) => {
          chunks[i] = e.data as Promise<FileType.FileChunk>[]
          worker.terminate()
          finishCount++
          if (finishCount === THREAD_COUNT) {
            resolve(Promise.all(chunks.flat()))
          }
        }
      }
    })
  }

  // 处理文件上传
  const handleUploadFile = async (e: Event) => {
    return new Promise<void>(async (resolve) => {
      const fileInput = e.target as HTMLInputElement
      const files = fileInput.files
      if (!files) return
      const fileList = Array.from(files)
      console.log('文件列表', fileList)
      fileUploadStore.addFiles(
        fileList.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          webkitRelativePath: file.webkitRelativePath || '',
          status: FileUploadStatus.AWAITING,
          uuid: uuid()
        }))
      )
      const promiseUploadChunkList = []
      let finishCount = 0

      for (const file of fileList) {
        const chunks = ChunkFileList(file)
        promiseUploadChunkList.push({ file, chunks })
      }

      const threadUploadTaskCount = Math.ceil(promiseUploadChunkList.length / THREAD_COUNT)

      for (let i = 0; i < THREAD_COUNT; i++) {
        const start = i * threadUploadTaskCount
        const end = Math.min(start + threadUploadTaskCount, promiseUploadChunkList.length)

        const uploadFileList = await Promise.all(
          promiseUploadChunkList.slice(start, end).map(async (it) => {
            return {
              file: it.file,
              chunks: await it.chunks
            }
          })
        )
        const worker = new FileUploadWorker()
        worker.postMessage({ uploadFileList })
        worker.onmessage = (e) => {
          finishCount++
          const { file, hash } = e.data
          console.log('上传完成', file, hash)
          if (finishCount === fileList.length) {
            resolve()
          }
        }
      }
    })
  }

  return {
    handleUploadFile
  }
}
