import AuthService from '../AuthService'

let authService

describe('#saveToken', () => {
  beforeEach(() => {
    authService = new AuthService()
  })

  it('sets token as service property and saves it in local storage', () => {
    const token = 'test-token'
    authService.saveToken(token)

    expect(authService.storageService.get('token')).toBe(token)
    expect(authService.token).toBe(token)
  })
})

describe('#login', () => {
  const response = {
    data: {
      token: 'test-token'
    }
  }

  beforeEach(() => {
    const apiMock = {
      post: jest.fn().mockReturnValue(Promise.resolve(response))
    }

    authService = new AuthService({ api: apiMock })
    authService.handleLoginResponse = jest.fn()
  })

  it('calls proxy interceptor to auth user', () => {
    const login = 'test'
    const password = 'pass'

    authService.login(login, password).then(() => {
      expect(authService.handleLoginResponse).toHaveBeenCalled()
    })

    expect(authService.api.post).toHaveBeenCalledWith(`/auth/login`, { login, password })
  })
})

describe('#handleLoginResponse', () => {
  const response = {
    data: {
      token: 'test-token'
    }
  }

  beforeEach(() => {
    const apiMock = {
      post: jest.fn().mockReturnValue(Promise.resolve(response))
    }

    authService = new AuthService({ api: apiMock })
    authService.saveToken = jest.fn()
  })

  it('passes token to save method after handling successful login and returns response data', () => {
    const result = authService.handleLoginResponse(response)

    expect(authService.saveToken).toHaveBeenCalledWith(response.data.token)
    expect(result).toBe(response.data)
  })
})
