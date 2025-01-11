import axios from 'axios'
import type { RES } from './types'
import { reqInterceptors } from './request-interceptors'
import { resInterceptors } from './response-interceptors'
import type { AxiosInstance, Method, AxiosProgressEvent } from 'axios'

export class AxiosRequest {
  private http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.APP_BASE_API,
      // timeout: 120000
      timeout: 0
    })
    reqInterceptors(this.http)
    resInterceptors(this.http)
  }

  private request<T>(
    url: string,
    method: Method,
    data?: any,
    auth?: boolean,
    headers?: any,
    handleUpload?: (progressEvent: AxiosProgressEvent) => void,
    handleDownload?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<RES<T>> {
    if (data) {
      delete data.create_time
      delete data.delete_time
      delete data.update_time
    }
    return this.http({
      url,
      method,
      params: method == 'get' ? data : undefined,
      data: method !== 'get' ? data : undefined,
      headers: { auth: auth === false ? false : true, ...headers },
      onUploadProgress: (progressEvent: AxiosProgressEvent) =>
        handleUpload && handleUpload(progressEvent),
      onDownloadProgress: (progressEvent: AxiosProgressEvent) =>
        handleDownload && handleDownload(progressEvent)
    })
  }

  /**
   * get请求
   */
  get<T = any>(
    url: string,
    data?: any,
    auth?: boolean,
    handleDownload?: (progressEvent: AxiosProgressEvent) => void
  ) {
    return this.request<T>(url, 'get', data, auth, handleDownload)
  }
  post<T = any>(url: string, data?: any, auth?: boolean, headers?: any) {
    return this.request<T>(url, 'post', data, auth, headers)
  }
  delete<T = any>(url: string, data?: any, auth?: boolean) {
    return this.request<T>(url, 'delete', data, auth)
  }
  put<T = any>(url: string, data?: any, auth?: boolean) {
    return this.request<T>(url, 'put', data, auth)
  }
  head<T = any>(url: string, data?: any, auth?: boolean) {
    return this.request<T>(url, 'head', data, auth)
  }
  patch<T = any>(url: string, data?: any, auth?: boolean) {
    return this.request<T>(url, 'patch', data, auth)
  }
  upload<T = any>(
    url: string,
    data?: any,
    auth?: boolean,
    handleUpload?: (progressEvent: AxiosProgressEvent) => void
  ) {
    return this.request<T>(
      url,
      'post',
      data,
      auth,
      { 'Content-Type': 'multipart/form-data' },
      handleUpload
    )
  }
}

// export const request = new (Helper.comm.singleton(axiosRequest))()
