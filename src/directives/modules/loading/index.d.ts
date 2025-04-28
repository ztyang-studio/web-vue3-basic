import type { DirectiveBinding } from 'vue'

export interface LoadingOptions {
  value?: boolean
  text?: string
  background?: string
  spinnerColor?: string
  style?: string
}

export type LoadingBinding = boolean | LoadingOptions

declare module 'vue' {
  interface ComponentCustomProperties {
    vLoading: typeof loadingDirective
  }
}
