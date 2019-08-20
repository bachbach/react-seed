import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from 'ducks/index'

class ReduxStoreConfigurator {
  constructor () {
    this.middlewares = [thunkMiddleware]
  }

  configureStore (initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(
      rootReducer,
      /* preloadedState, */
      composeEnhancers(
        applyMiddleware(...this.middlewares)
      ),
      initialState
    );

    return this.store
  }
}

export default new ReduxStoreConfigurator()
