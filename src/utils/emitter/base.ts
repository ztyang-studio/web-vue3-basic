export default class BaseEmitter<T extends string> {
  private _listeners: Record<string, Set<Function>>

  constructor(eventNameList: string[]) {
    this._listeners = {}
    for (const eventName of eventNameList) {
      this._listeners[eventName] = new Set()
    }
  }

  on(eventName: T, listener: Function) {
    this._listeners[eventName].add(listener)
  }

  emit(eventName: T, ...args: any[]) {
    for (const listener of this._listeners[eventName]) {
      listener(...args)
    }
  }
}
