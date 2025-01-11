import type { FileType } from '@/typings/file'
import { ConcurrentTask } from '@/utils/task'
import SparkMD5 from 'spark-md5'

// 上传文件分片
const handleUploadChunk = (chunk: FileType.FileChunk) => {
  // 模拟耗时
  const time = 1000
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log('上传分片', chunk.hash)
      resolve(chunk)
    }, time)
  })
}

self.onmessage = async (e) => {
  const { uploadFileList } = e.data
  const uploadTask = new ConcurrentTask({ immately: false })

  for (const { file, chunks } of uploadFileList) {
    const spark = new SparkMD5.ArrayBuffer()
    for (const chunk of await chunks) {
      const arrayBuffer = new TextEncoder().encode(chunk.hash).buffer
      spark.append(arrayBuffer)
      uploadTask.add(() => handleUploadChunk(chunk))
    }
    const hash = spark.end()
    uploadTask.start()
    await uploadTask.compelete()
    self.postMessage({ file, hash })
  }
}
