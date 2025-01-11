interface seltctionAction {
  selectFile: (e: Event) => void
  // selectFolder: (e: Event) => void
}

export const useFileSelect = (action?: seltctionAction) => {
  // 创建文件上传 input
  const createFileInput = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.onchange = (e) => {
      // 获取文件夹名字
      // fileInput.webkitdirectory ? action?.selectFolder(e) : action?.selectFile(e)
      action?.selectFile(e)
      fileInput.value = ''
    }
    return fileInput
  }

  const fileInput = createFileInput()

  // 选择文件
  const selectFile = () => {
    fileInput.multiple = true
    fileInput.webkitdirectory = false
    fileInput.click()
  }

  // 选择文件夹
  const selectFolder = () => {
    fileInput.multiple = false
    fileInput.webkitdirectory = true
    fileInput.click()
  }

  // 创建文件夹
  const createFolder = () => {
    // 创建文件夹的逻辑
  }

  return {
    selectFile,
    selectFolder,
    createFolder
  }
}
