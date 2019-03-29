import auth from '@/libs/auth'
import { Commit } from 'vuex'
import user from '@/api/user'
import LoginForm from '@/views/login/model/login-form'

const namespaced = true

export interface User {
    userid: number
    username: string
}

export interface State {
    token: string | undefined
    user: User | null
}

const state: State = {
  token: auth.getToken(),
  user: null
}

const mutations = {
  SET_TOKEN (state: State, token: string) {
    state.token = token
    auth.setToken(token)
  }
}

const actions = {
  // 登录
  login (context: { commit: Commit }, loginForm: LoginForm) {
    return new Promise((resolve, reject) => {
      user.login(loginForm).then((res:any) => {
        context.commit('SET_TOKEN', res.data.token)
        resolve()
      }).catch((error:any) => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
