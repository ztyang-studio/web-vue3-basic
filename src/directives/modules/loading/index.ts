import {
  createApp,
  type Directive,
  type App,
  type ComponentPublicInstance,
  type DirectiveBinding,
  nextTick,
} from 'vue'
import LoadingComponent from './loading.vue'
import type { LoadingOptions, LoadingBinding } from './index.d'

// 定义 Loading 组件实例类型
interface LoadingInstance extends ComponentPublicInstance {
  setText?: (text: string) => void
  setVisible?: (visible: boolean) => void
}

// 定义元素扩展类型
interface LoadingEl extends HTMLElement {
  _loadingInstance?: LoadingInstance
  _loadingApp?: App<Element>
}

// 创建 loading 指令
const loadingDirective: Directive<LoadingEl, LoadingBinding> = {
  mounted(el: LoadingEl, binding: DirectiveBinding<LoadingBinding>) {
    el.style.position = 'relative'
    const options: LoadingOptions =
      typeof binding.value === 'boolean' ? { value: binding.value } : binding.value || {}

    const app = createApp(LoadingComponent, {
      text: options.text,
      background: options.background,
      spinnerColor: options.spinnerColor,
      style: options.style,
      visible: options.value ?? true,
    })

    const instance = app.mount(document.createElement('div')) as LoadingInstance
    el._loadingInstance = instance
    el._loadingApp = app

    // 将loading容器作为最后一个子元素插入
    el.appendChild(instance.$el)

    // 确保初始状态正确
    nextTick(() => {
      updateLoading(el, binding)
    })
  },
  updated(el: LoadingEl, binding: DirectiveBinding<LoadingBinding>) {
    // 深度比较对象值变化
    if (JSON.stringify(binding.oldValue) !== JSON.stringify(binding.value)) {
      updateLoading(el, binding)

      // 更新文本等选项
      if (el._loadingInstance && typeof binding.value !== 'boolean') {
        el._loadingInstance.setText?.(binding.value?.text || '')
      }
    }
  },
  unmounted(el: LoadingEl) {
    el._loadingApp?.unmount()
    el._loadingInstance?.$el?.remove()
    el._loadingInstance = undefined
    el._loadingApp = undefined
  },
}

function updateLoading(el: LoadingEl, binding: DirectiveBinding<LoadingBinding>) {
  if (!el._loadingInstance) return

  const isLoading =
    typeof binding.value === 'boolean' ? binding.value : (binding.value?.value ?? true)

  // 设置父元素定位
  el.style.position = isLoading ? 'relative' : ''

  // 确保loading容器是最后一个子元素
  const container = el._loadingInstance.$el.parentElement
  if (container && container.parentNode === el && container !== el.lastElementChild) {
    el.appendChild(container)
  }

  // 更新显示状态
  el._loadingInstance.setVisible?.(isLoading)

  // 直接控制显示，双重保障
  if (el._loadingInstance.$el) {
    el._loadingInstance.$el.style.display = isLoading ? 'flex' : 'none'
  }
}

export default loadingDirective
