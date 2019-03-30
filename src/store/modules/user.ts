import auth from '@/libs/auth'
import { Commit } from 'vuex'
import user from '@/api/user'
import LoginForm from '@/views/login/model/login-form'

const namespaced = true

export interface User {
  userid: number
  username: string,
  realName?: string
  avatar?: string
}

export interface State {
  token: string | undefined
  user: User
}

const state: State = {
  token: auth.getToken(),
  user: {
    userid: 0,
    username: '',
    avatar:''
  }
}

const mutations = {
  SET_TOKEN(state: State, token: string) {
    state.token = token
    auth.setToken(token)
  },
  SET_USER(state: State, user: User) {
    state.user = user
  }
}

const actions = {
  // 登录
  login(context: { commit: Commit }, loginForm: LoginForm) {
    return new Promise((resolve, reject) => {
      user.login(loginForm).then((res: any) => {
        context.commit('SET_TOKEN', res.data.token)
        resolve()
      }).catch((error: any) => {
        reject(error)
      })
    })
  },
  getUserInfo(context: { commit: Commit }) {
    user.userinfo().then(res => {
      context.commit('SET_USER', res.data)
    })
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
