import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

const sagaMiddleware = createSagaMiddleware()

let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (typeof composeWithDevToolsExtension === 'function') {
    composeEnhancers = composeWithDevToolsExtension
  }
}

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(sagas)

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,

  document.getElementById('root'))
