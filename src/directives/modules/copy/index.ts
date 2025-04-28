import { Message } from '@arco-design/web-vue'
import type { Directive, DirectiveBinding } from 'vue'
// import { ElMessage } from 'element-plus'
interface ElType extends HTMLElement {
  copyData: string | number
  __handleClick__: any
}

function handleClick(this: any) {
  const input = document.createElement('input')
  input.style.opacity = '0'
  input.value = this.copyData.toLocaleString()
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  document.body.removeChild(input)
  Message.success('复制成功')
}

export default {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
    el.addEventListener('click', handleClick)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.__handleClick__)
  }
}
