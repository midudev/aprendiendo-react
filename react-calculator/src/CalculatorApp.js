import React from 'react'

import { DisplayContainer } from './containers/DisplayContainer'
import { KeyPadContainer } from './containers/KeyPadContainer'

import './CalculatorApp.css'

export const CalculatorApp = () => (
    <div className='calculator'>
        <DisplayContainer />
        <KeyPadContainer />
    </div>
)