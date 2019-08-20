import axios from 'axios'
import mitt from 'mitt'
import appRegistry from './AppRegistry'

class APIInterceptor {
  constructor (baseURL = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`) {
    this.baseURL = baseURL

    const settings = {
      baseURL: this.baseURL
    }

    this.api = axios.create(settings)
    this.api.interceptors.response.use(
      successRes => successRes,
      error => {
        if (error.response && error.response.status === 401) {
          APIInterceptor.events.emit('authorizationError', { err: error })
        }

        return Promise.reject(error)
      }
    )
  }

  static events = mitt()

  get (url) {
    return this.api.get(url, this.mergeConfig())
  }

  post (url, payload) {
    return this.api.post(url, payload, this.mergeConfig())
  }

  mergeConfig (config = {}) {
    const token = appRegistry.storage.get('token')

    return Object.assign({}, config, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...config.headers
      }
    })
  }
}

export { APIInterceptor }
export default new APIInterceptor()
