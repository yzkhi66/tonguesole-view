import { Route } from 'vue-router'
import { beforeEach } from '@/router'
import auth from '@/libs/auth'

describe('router', () => {
  it('不需要身份认证的路由，正常访问', () => {
    const next = jest.fn()
    beforeEach(createTo(), createFrom(), next)
    expect(next).toBeCalledTimes(1)
    expect(next.mock.calls[0].length).toBe(0)
  })

  it('需要身份认证的路由，但未通过认证，跳转到登录页', () => {
    const next = jest.fn()
    const to = createTo()
    to.meta.auth = true
    const from = createFrom()
    auth.getToken = jest.fn().mockReturnValue(undefined)
    beforeEach(to, from, next)
    expect(next).toBeCalledTimes(1)
    expect(next.mock.calls[0][0].path).toBe('/login')
  })

  it('需要身份认证的路由，通过认证，正常访问', () => {
    const next = jest.fn()
    const to = createTo()
    to.meta.auth = true
    const from = createFrom()
    auth.getToken = jest.fn().mockReturnValue('ssss')
    beforeEach(to, from, next)
    expect(next).toBeCalledTimes(1)
    expect(next.mock.calls[0].length).toBe(0)
  })

  function createTo (): Route {
    const to: Route = {
      path: '/to',
      hash: '',
      query: {},
      params: {},
      fullPath: '',
      matched: [],
      meta: {
        auth: false
      }
    }
    return to
  }

  function createFrom (): Route {
    const from: Route = {
      path: '/from',
      hash: '',
      query: {},
      params: {},
      fullPath: '',
      matched: [],
      meta: {
        auth: false
      }
    }
    return from
  }
})
