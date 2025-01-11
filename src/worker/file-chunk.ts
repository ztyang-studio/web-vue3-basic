import { CreateChunk } from '@/utils/file/chunk'

type FileChunkParams = {
  file: File
  start: number
  end: number
  chunk_size: number
}

self.onmessage = async (e: { data: FileChunkParams }) => {
  const { file, start, end, chunk_size } = e.data
  const result = []
  if (start < end) {
    for (let i = start; i < end; i++) {
      result.push(CreateChunk(file, i * chunk_size, chunk_size))
    }
  }
  const chunks = await Promise.all(result)
  self.postMessage(chunks)
}
