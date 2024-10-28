import { useUserApi } from './modules/comm/user'
import { useConfigApi } from './modules/comm/config'
import { useInstallApi } from './modules/dev/install'
import { useFileApi } from './modules/comm/file'

export { useUserApi, useFileApi, useConfigApi, useInstallApi }

// const apiModules = import.meta.glob('./modules/**/**.ts', { eager: true })
// const exportsToReExport = {}

// // 动态加载并聚合所有模块
// for (const path in apiModules) {
//   console.log('path: ', apiModules[path])
//   Object.assign(exportsToReExport, apiModules[path])
// }

// console.log('exportsToReExport: ', exportsToReExport)

// export default exportsToReExport
