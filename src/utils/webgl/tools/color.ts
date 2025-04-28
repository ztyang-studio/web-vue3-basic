/**
 * 将 CSS 颜色值转换为思维向量（归一化的 RGBA 向量）
 * @param color - CSS 颜色值，支持 #RRGGBB、rgb(r, g, b)、rgba(r, g, b, a) 等格式
 * @returns 返回一个四维向量 [r, g, b, a]，每个分量在 [0, 1] 范围内
 */
export function cssColorToVector(color: string): [number, number, number, number] {
  // 创建一个临时 div 元素，利用浏览器的解析能力
  const div = document.createElement('div')
  div.style.color = color
  document.body.appendChild(div)

  // 获取计算后的颜色值
  const computedColor = window.getComputedStyle(div).color
  document.body.removeChild(div)

  // 解析 rgba(r, g, b, a) 格式
  const rgbaMatch = computedColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i)
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10) / 255
    const g = parseInt(rgbaMatch[2], 10) / 255
    const b = parseInt(rgbaMatch[3], 10) / 255
    const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1 // 如果没有 alpha，默认为 1
    return [r, g, b, a]
  }

  // 解析 #RRGGBB 或 #RRGGBBAA 格式
  const hexMatch = computedColor.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i)
  if (hexMatch) {
    const r = parseInt(hexMatch[1], 16) / 255
    const g = parseInt(hexMatch[2], 16) / 255
    const b = parseInt(hexMatch[3], 16) / 255
    const a = hexMatch[4] ? parseInt(hexMatch[4], 16) / 255 : 1 // 如果没有 alpha，默认为 1
    return [r, g, b, a]
  }

  throw new Error('Invalid CSS color format')
}

/**
 * 生成随机颜色
 */
export function randomColor(): string {
  return `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`
}
