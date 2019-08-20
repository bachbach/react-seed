import Lockr from 'lockr'

class StorageService {
  _storageInterface = {}

  constructor (storageInterface = Lockr) {
    this._storageInterface = storageInterface
  }

  get prefix () {
    return this._storageInterface.prefix
  }

  set prefix (prefix) {
    this._storageInterface.prefix = prefix
  }

  get (key, defaultValue = null) {
    return this._storageInterface.get(key, defaultValue)
  }

  set (key, value) {
    return this._storageInterface.set(key, value)
  }

  rm (key) {
    this._storageInterface.rm(key)
  }

  flush () {
    this._storageInterface.flush()
  }
}

export { StorageService }
export default new StorageService()
