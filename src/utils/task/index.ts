type Options = {
  paralelCount: number
  immately: boolean
}

/**
 * 并发任务
 * @param paralelCount 并发数量，默认为10
 * @param immately 是否立即执行，默认为true
 */
export class ConcurrentTask {
  paralelCount: number // 并发数量，默认为10
  taskList: any[] // 任务列表
  runningCount: number // 正在执行的任务数量
  immately: boolean // 是否立即执行

  constructor(options?: Partial<Options>) {
    const { paralelCount = 10, immately = true } = options || {}
    this.paralelCount = paralelCount
    this.taskList = []
    this.runningCount = 0
    this.immately = immately
  }

  add(task: Function) {
    return new Promise((resolve, reject) => {
      this.taskList.push({
        task,
        resolve,
        reject
      })
      this.immately && this._run()
    })
  }

  /**
   * 开始执行任务
   */
  start() {
    if (this.immately) return
    for (let i = 0; i < this.paralelCount; i++) {
      this._run()
    }
  }

  /**
   * 暂停任务
   */
  pause() {
    this.immately = false
  }

  /**
   * 恢复任务
   */
  resume() {
    this.immately = true
    this._run()
  }

  /**
   * 停止任务
   */
  stop() {
    this.taskList = []
    this.runningCount = 0
  }

  // 等待当前任务完成
  compelete() {
    return new Promise<void>((resolve) => {
      const timer = setInterval(() => {
        if (this.runningCount === 0 && this.taskList.length === 0) {
          clearInterval(timer)
          resolve()
        }
      }, 1000)
    })
  }

  private _run() {
    if (this.runningCount < this.paralelCount && this.taskList.length > 0) {
      const { task, resolve, reject } = this.taskList.shift()
      this.runningCount++
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--
          this._run()
        })
    }
  }
}
