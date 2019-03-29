import router from '@/router'
import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import config from '@/config'
import { MessageBox, Message } from 'element-ui'

export interface RequestConfig {
  url: string
  data: any
}

export class Http {
  /**
     * Request方法
     * @param options
     */
  public request(options: AxiosRequestConfig): any {
    let baseConf: AxiosRequestConfig = {
      baseURL: config.baseURL
    }
    let instance = Axios.create(baseConf)
    this.interceptors(instance)
    return instance.request(options)
  }

  /**
     * Get方法
     * @param options
     */
  public get(url: string): any {
    return this.request({
      method: 'GET',
      url
    })
  }

  /**
     * post方法
     * @param url
     * @param data
     */
  public post(url: string, data?: any): any {
    return this.request({
      method: 'POST',
      url,
      data: data
    })
  }

  /**
     *
     * @param instance 拦截器
     */
  private interceptors(instance: AxiosInstance): void {
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      let { data } = res
      // 正常
      if (data.code === 200) {
        return data
      }
      // 未通过身份验证
      if (data.code === 20002) {
        router.push('/login')
      }
      // 系统内部错误
      if (data.code === 40001) {
        MessageBox.alert(data.message, {
          type: 'error'
        })
      }
      return Promise.reject(data)
    }, (error) => {
      MessageBox.alert('服务器内部错误:' + error.message, {
        type: 'error'
      })
      return Promise.reject(error)
    })
  }
}

const http = new Http()
export default http
