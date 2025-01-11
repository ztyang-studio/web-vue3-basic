import { defineStore } from 'pinia'
import { SystemEmitter } from '@/emitter'
import type { ConfigType } from '@/typings/config'

export const useSystemStore = defineStore('systemStore', {
  state: (): Partial<ConfigType.Site> => {
    return {
      logo: undefined,
      site_name: undefined,
      favicon: undefined
    }
  },

  getters: {
    hasSystemConfig: (state) => !!state.site_name
  },
  actions: {
    async init() {
      if (this.hasSystemConfig) {
        SystemEmitter.emit('SYSTEM:SITE-SUCCESS')
        return
      }
      const { code, data } = await useConfigApi.siteConfig()

      if (code === 200) {
        this.$patch(data)
      } else {
        SystemEmitter.emit('SYSTEM:SITE-FAILED')
        // this.site_name = import.meta.env.APP_TITLE
        // this.logo = '/static/images/logo/logo.svg'
      }
    }
  },
  persist: [
    {
      key: 'SYSTEM-CONFIG',
      // storage: localStorage
      storage: sessionStorage
    }
  ]
})
