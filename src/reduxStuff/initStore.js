import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'
import customMiddleware from './middleware'


const initStore = (initialState = {}) => {
  if (process.browser && window.__store) {
    return window.__store
  }

  const middleware = [
    customMiddleware,
    thunk
  ]

  const enhancers = [
    applyMiddleware(...middleware),
  ]

  const composeEnhancers =
    process.env.NODE_ENV !== 'production'
      ? composeWithDevTools : compose

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(...enhancers)
  )

  if (process.browser) {
    window.__store = store
  }

  return store
}

export default initStore
