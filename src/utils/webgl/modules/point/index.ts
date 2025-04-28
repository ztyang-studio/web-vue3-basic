import BaseGL from '../../base'
import type { BaseGLOptions } from '../../types'

class point extends BaseGL {
  vertices: number[] = []

  constructor(id: string, options?: BaseGLOptions) {
    super(id, options)
    this.init()
  }

  private init() {
    const vertexBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer)

    // 将缓冲区的顶点数据分配给a_Position变量
    const a_Position = this.gl.getAttribLocation(this.program, 'a_Position')

    this.gl.vertexAttribPointer(a_Position, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(a_Position)
  }

  draw(x: number, y: number) {
    this.vertices.push(...this.normalizeCoords(x, y))
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW)
    this.gl.drawArrays(this.gl.POINTS, 0, this.vertices.length / 2)
  }

  clear() {
    this.vertices = []
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }
}

export const Point = point
