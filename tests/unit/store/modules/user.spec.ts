import LoginForm from '@/views/login/model/login-form'
import user from '@/api/user'
import auth from '@/libs/auth'
import store, { State } from '@/store/modules/user'
import flushPromises from 'flush-promises'

describe('store.user.state', () => {
  beforeAll(() => {
    auth.setToken = jest.fn()
  })

  it('mutations.set_token', () => {
    const state: State = {
      token: '79faf82271944fe38c4f1d99be71bc9c',
      user: {
        userid: 0,
        username: ''
      }
    }
    store.mutations.SET_TOKEN(state, '79faf82271944fe38c4f1d99be71bc9c')
    expect(state.token).toBe('79faf82271944fe38c4f1d99be71bc9c')
  })

  it('mutations.set_token,token保存到cookie', () => {
    const state: State = {
      token: '79faf82271944fe38c4f1d99be71bc9c',
      user: {
        userid: 0,
        username: ''
      }
    }
    store.mutations.SET_TOKEN(state, '79faf82271944fe38c4f1d99be71bc9c')
    expect(auth.setToken).toBeCalledWith('79faf82271944fe38c4f1d99be71bc9c')
  })

  it('mutations.set_user', () => {
    const state: State = {
      token: '79faf82271944fe38c4f1d99be71bc9c',
      user: {
        userid: 0,
        username: ''
      }
    }
    store.mutations.SET_USER(state, {
      userid: 1,
      username: 'admin'
    })
    expect(state.user.userid).toBe(1)
  })
})

describe('actions', () => {

  it('登录成功,保存token', async () => {
    const login = jest.fn().mockResolvedValue({
      data: {
        token: '79faf82271944fe38c4f1d99be71bc9c',
        user: {
          userid: 0,
          username: ''
        }
      }
    })
    user.login = login

    const loginForm: LoginForm = {
      username: 'admin',
      password: 'admin'
    }

    const commit = jest.fn()
    await store.actions.login({ commit }, loginForm).then(() => {
      expect(commit.mock.calls[0][0]).toBe('SET_TOKEN')
      expect(commit.mock.calls[0][1]).toBe('79faf82271944fe38c4f1d99be71bc9c')
      expect(commit).toBeCalledTimes(1)
    })
  })

  it('登录失败,返回错误信息', async () => {
    jest.spyOn(user, 'login').mockRejectedValue({
      code: '500',
      message: '用户名或密码错误',
      data: {
        token: '79faf82271944fe38c4f1d99be71bc9c'
      }
    })

    const loginForm: LoginForm = {
      username: 'admin',
      password: 'admin'
    }

    const commit = jest.fn()
    await store.actions.login({ commit }, loginForm).catch((error) => {
      expect(error.message).toBe('用户名或密码错误')
      expect(commit).toBeCalledTimes(0)
    })
  })
  it('获取用户信息', async () => {
    const userinfo = jest.fn().mockResolvedValue({
      data: {
        userid: 1,
        username: 'admin'
      }
    })

    user.userinfo = userinfo
    const commit = jest.fn()
    store.actions.getUserInfo({ commit })
    await flushPromises()
    expect(commit).toBeCalledTimes(1)
    expect(commit.mock.calls[0][0]).toBe('SET_USER')
    expect(commit.mock.calls[0][1].userid).toBe(1)
  })

})
