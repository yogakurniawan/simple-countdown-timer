import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import initStore from 'reduxStuff/initStore'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = initStore()

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
