import MoviesService from 'services/MoviesService'
import APIInterceptor from 'services/APIInterceptor'

describe('#constructor', () => {
  it('uses APIInterceptor as default api object', () => {
    const portService = new MoviesService()

    expect(portService.api.constructor.name).toBe(APIInterceptor.constructor.name)
  })
})

describe('service methods', () => {
  let moviesService

  beforeEach(() => {
    moviesService = new MoviesService(global.mockApi)
  })

  describe('#fetch all movies', () => {
    it('calls api to get all movies', () => {
      const spy = spyOn(moviesService.api, 'get')
      moviesService.getMovies()

      expect(spy).toHaveBeenCalledWith('/movies?')
    })

    it('calls api to get all movies with provided query', () => {
      const spy = spyOn(moviesService.api, 'get')
      moviesService.getMovies('someTest=query&someTest=values')

      expect(spy).toHaveBeenCalledWith('/movies?someTest=query&someTest=values')
    })
  })

  describe('#fetch single movie', () => {
    it('calls api to get all movies', () => {
      const spy = spyOn(moviesService.api, 'get')
      moviesService.getMovie('testId')

      expect(spy).toHaveBeenCalledWith('/movies/testId')
    })
  })
})
