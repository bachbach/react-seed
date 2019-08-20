import { APIInterceptor } from './APIInterceptor'
import appRegistry from './AppRegistry'

class AuthService {
  token = null

  constructor ({ api = null, storageService = null } = {}) {
    this.api = api || new APIInterceptor(window.REACT_APP_PROXY_API_URL)
    this.storageService = storageService || appRegistry.storage

    this.token = this.storageService.get('token')
  }

  saveToken (token) {
    this.token = token
    this.storageService.set('token', token)
  }

  async login (login, password) {
    const response = await this.api.post(`/auth/login`, {
      login,
      password
    })

    return this.handleLoginResponse(response)
  }

  handleLoginResponse (response) {
    const { token } = response.data
    this.saveToken(token)

    return response.data
  }
}

export default AuthService
