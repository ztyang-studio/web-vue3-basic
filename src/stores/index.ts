import { createPinia } from 'pinia'

export { useSystemStore } from './modules/system'
export { useUserStore } from './modules/user'
export { useAppStore } from './modules/app'
export { useFileUploadStore } from './modules/file-upload'

const pinia = createPinia()
export default pinia
