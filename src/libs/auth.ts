import Cookies from 'js-cookie'
export class Auth {
    private TOKEN_KEY: string = 'token'

    public getToken (): string | undefined {
      const token = Cookies.get(this.TOKEN_KEY)
      return token
    }

    public setToken (token: string, expires: number = 1): void {
      // 默认保存一天
      Cookies.set(this.TOKEN_KEY, token, { expires: expires })
    }
}

const auth = new Auth()
export default auth
