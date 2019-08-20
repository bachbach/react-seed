import { StorageService } from './StorageService'

const registry = {}

class AppRegistry {
  constructor () {
    const registryProxy = new Proxy(this, this)

    this.add('storage', new StorageService())
    registry.storage.prefix = 'movies-'

    return registryProxy
  }

  add (entryName, entryClass) {
    registry[entryName] = entryClass
  }

  get (self, entryName) {
    return self[entryName] || registry[entryName]
  }
}

export default new AppRegistry()
