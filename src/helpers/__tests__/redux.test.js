import { transformById } from '../redux'

describe('#transformById', () => {
  const array = [
    {
      id: 1,
      value: 'test'
    },
    {
      id: 2,
      value: 'test'
    },
    {
      id: 3,
      value: 'test'
    }
  ]

  it('should return correct values', () => {
    const result = {
      1: {
        id: 1,
          value: 'test'
      },
      2: {
        id: 2,
          value: 'test'
      },
      3: {
        id: 3,
          value: 'test'
      }
    }

    expect(transformById(array)).toEqual(result)
  })

  it('should return empty object when no params provided', () => {
    expect(transformById([])).toEqual({})
  })
})