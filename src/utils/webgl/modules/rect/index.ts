import BaseGL from '../../base'
import { cssColorToVector, randomColor } from '../../tools/color'
import type { BaseGLOptions } from '../../types'
import fragmentSource from './fragment.glsl'

type RectOptions = { color?: string } & BaseGLOptions

interface Rectangle {
  x: number
  y: number
  w: number
  h: number
  color: string
}

class rect extends BaseGL {
  private uColor: WebGLUniformLocation | null = null
  private rectangles: Rectangle[] = []

  constructor(id: string, options?: RectOptions) {
    super(id, { ...(options || {}), fragmentShaderSource: fragmentSource })
    this.init()
  }

  private init() {
    const vertexBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer)

    const a_Position = this.gl.getAttribLocation(this.program, 'a_Position')
    this.gl.vertexAttribPointer(a_Position, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(a_Position)

    this.uColor = this.gl.getUniformLocation(this.program, 'u_Color')
  }

  draw(x: number, y: number, w: number, h: number, color?: string) {
    const rectColor = color || randomColor()
    this.rectangles.push({ x, y, w, h, color: rectColor })
    this.redraw()
  }

  private redraw() {
    this.clearGL()

    for (const rect of this.rectangles) {
      const x1 = this.normalizeX(rect.x)
      const y1 = this.normalizeY(rect.y)
      const x2 = this.normalizeX(rect.x + rect.w)
      const y2 = this.normalizeY(rect.y + rect.h)
      this.gl.bufferData(
        this.gl.ARRAY_BUFFER,
        new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
        this.gl.STATIC_DRAW,
      )

      this.gl.uniform4f(this.uColor, ...cssColorToVector(rect.color))
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
    }
  }

  clear() {
    this.rectangles = []
    this.clearGL()
  }
}

export const Rect = rect
