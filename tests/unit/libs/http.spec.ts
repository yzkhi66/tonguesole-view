import { MessageBox } from 'element-ui'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import http from '@/libs/http'
import router from '@/router'
let axiosMock = new MockAdapter(axios)

describe('libs.http测试', () => {
  it('request方法', async () => {
    axiosMock.onGet('/request').reply(200, {
      code: 200,
      data: 'request'
    })
    await http.request({
      method: 'GET',
      url: '/request'
    }).then((data: any) => {
      expect(data.data).toBe('request')
    })
  })

  it('GET方法', async () => {
    axiosMock.onGet('/get').reply(200, {
      code: 200,
      data: 'get'
    })
    await http.get('/get').then((data: any) => {
      expect(data.data).toBe('get')
    })
  })

  it('Post方法', async () => {
    axiosMock.onGet('/post').reply(200, {
      code: 200,
      data: 'post'
    })
    await http.get('/post').then((data: any) => {
      expect(data.data).toBe('post')
    })
  })

  it('身份未通过验证，跳转到登录页', async () => {
    axiosMock.onGet('/noauth').reply(200, {
      code: 20002,
      message: '系统内错误',
      data: {
        value: ''
      }
    })

    jest.spyOn(router, 'push')

    await http.get('/noauth').catch((data: any) => {
      expect(router.push).toBeCalledTimes(1)
      expect(router.push).toHaveBeenCalledWith('/login')
    })
  })

  it('40001错误，弹出MessageBox', async () => {
    axiosMock.onGet('/40001').reply(200, {
      code: 40001,
      message: '系统内错误',
      data: {
        value: ''
      }
    })
    const next = jest.fn()
    MessageBox.alert = next
    await http.get('/40001').catch((data: any) => {
      expect(next).toBeCalledTimes(1)
      expect(next.mock.calls[0][0]).toBe('系统内错误')
      expect(data.code).toBe(40001)
    })
  })

  it('30001业务系统错误', async () => {
    axiosMock.onGet('/30001').reply(200, {
      code: 30001,
      message: '业务系统错误',
      data: {

      }
    })

    await http.get('/30001').catch((data: any) => {
      expect(data.code).toBe(30001)
      expect(data.message).toBe('业务系统错误')
    })
  })

  it('服务器500错误', async () => {
    axiosMock.onGet('/509').reply(509)

    const next = jest.fn()
    MessageBox.alert = next

    await http.get('/509').catch((res: any) => {
      expect(next).toBeCalledTimes(1)
      expect(next.mock.calls[0][0]).toBe('服务器内部错误:Request failed with status code 509')
    })
  })
})
