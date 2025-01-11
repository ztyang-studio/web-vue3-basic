import type { FileType } from '@/typings/file'
import SparkMD5 from 'spark-md5'

/**
 * 创建分片
 * @param blob 文件对象
 * @param offset 偏移量
 * @param chunk_size 分片大小
 * @returns
 */
export const CreateChunk = (
  file: File,
  offset: number,
  chunk_size: number
): Promise<FileType.FileChunk> => {
  return new Promise((resolve, reject) => {
    const blob = file.slice(offset, offset + chunk_size)
    const spark = new SparkMD5.ArrayBuffer()

    const fileReader = new FileReader()
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      spark.append(e.target!.result as ArrayBuffer)
      resolve({ blob, hash: spark.end(), offset, size: blob.size })
    }
    fileReader.onerror = () => {
      reject('文件读取失败')
    }
    fileReader.readAsArrayBuffer(blob)
  })
}
