import { useDebounceFn } from '@vueuse/core'
import BaseGL from '../../base'
import type { BaseGLOptions } from '../../types'
import vShaderSource from './vertex.glsl'

/**
 * 矩形画布
 */
export class BaseShader extends BaseGL {
  private startTime: number
  private endTime: number
  private currentAnimationFrame: number = 0
  private lastFrameTime: number = performance.now() // 上一帧的时间
  private frameCount: number = 0 // 帧数计数器
  private fps: number = 0 // 当前 FPS
  private isRendering: boolean = true // 控制渲染的标志

  constructor(target: string | HTMLCanvasElement, options?: BaseGLOptions) {
    super(target, { vertexShaderSource: vShaderSource, ...options })
    this.initRect()
    this.startTime = performance.now()
    this.endTime = performance.now()
    this.render()

    // 监听窗口尺寸变化
    // window.addEventListener('resize', this.handleResize);
  }

  pauseRun() {
    cancelAnimationFrame(this.currentAnimationFrame)
    this.isRendering = false // 停止渲染
  }

  stopRun() {
    this.pauseRun()
    this.frameCount = 0
    this.fps = 0
    this.lastFrameTime = performance.now()
  }

  restartRun() {
    this.stopRun()
    this.resumeRun()
  }

  resumeRun() {
    this.startTime += performance.now() - this.endTime
    this.isRendering = true // 恢复渲染
    this.render()
  }

  runTime() {
    return (this.endTime - this.startTime) / 1000
  }

  getFps(): number {
    return this.fps
  }

  updateFragmentShader(fragmentShaderSource: string) {
    super.updateFragmentShader(fragmentShaderSource)
  }

  private render() {
    if (!this.program) return
    if (!this.isRendering) return // 如果停止渲染，则直接返回

    this.clearGL()

    // 更新 FPS
    const now = performance.now()
    const deltaTime = now - this.lastFrameTime
    this.frameCount++

    // 每 1 秒计算一次 FPS
    if (deltaTime >= 1000) {
      this.fps = parseFloat((this.frameCount / (deltaTime / 1000)).toFixed(2)) // 计算 FPS 并精确到两位小数
      this.frameCount = 0 // 重置帧数计数器
      this.lastFrameTime = now // 重置上一帧时间
    }

    // 设置 uniform 变量
    const iResolution = this.gl.getUniformLocation(this.program, 'iResolution')
    this.gl.uniform2f(iResolution, this.gl.canvas.width, this.gl.canvas.height)

    const iTime = this.gl.getUniformLocation(this.program, 'iTime')
    this.endTime = performance.now()
    this.gl.uniform1f(iTime, (this.endTime - this.startTime) / 1000)

    // 绘制矩形
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)

    // 继续渲染下一帧
    if (this.isRendering) {
      // 如果仍在渲染，则请求下一帧
      this.currentAnimationFrame = requestAnimationFrame(() => this.render())
    }
  }

  private initRect() {
    const a_Position = this.gl.getAttribLocation(this.program, 'a_Position')
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer())
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]),
      this.gl.STATIC_DRAW,
    )
    this.gl.vertexAttribPointer(a_Position, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(a_Position)
  }

  private handleResize = useDebounceFn(() => {
    // this.clearGL();
    // this.resizeCanvas();
    // this.updateViewport();
    // this.render();
  }, 100)

  // destroy() {
  //   window.removeEventListener('resize', this.handleResize);
  // }
}
