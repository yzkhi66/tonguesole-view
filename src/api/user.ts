import http from '@/libs/http'
import LoginForm from '@/views/login/model/login-form'
export class User {
  login(loginForm: LoginForm): Promise<any> {
    return http.post('/login', loginForm)
  }
  userinfo(): Promise<any> {
    return http.post('/userinfo')
  }
}

const user = new User()
export default user
