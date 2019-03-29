import http from '@/libs/http'
import LoginForm from '@/views/login/model/login-form'
export class User {
  login (loginForm:LoginForm) {
    return http.post('/login', loginForm)
  }
}

const user = new User()
export default user
