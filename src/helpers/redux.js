export const transformById = (collection, idKey = 'id') =>
  collection.reduce((hash, entity) => {
    hash[entity[idKey]] = entity

    return hash
  }, {})

export const transformToArray = (collection = {}) => Object.keys(collection).map(id => collection[id])
