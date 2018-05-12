import React from 'react'
import ReactDOM from 'react-dom'

import {CalculatorApp} from './CalculatorApp'
import './app.css'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import calculatorAppReducers from './reducers/'

const store = createStore(calculatorAppReducers)

ReactDOM.render(
  <Provider store={store}>
    <CalculatorApp />
  </Provider>,
  document.getElementById('app')
)

/* without redux
ReactDOM.render(
  <CalculatorApp />,
  document.getElementById('app')
)
*/