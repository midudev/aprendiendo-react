import React from 'react'
import PropTypes from 'prop-types'

import { Key } from '../Key'
import { OPERATIONS } from '../../constants'

import './styles.css'

export const KeyPad = ({ addDecimal, addInputValue, calculateResult, changeOperation }) => (
    <section className='keyPad'>
        <Key onClick={addInputValue} value='7' />
        <Key onClick={addInputValue} value='8' />
        <Key onClick={addInputValue} value='9' />
        <Key isOperator onClick={changeOperation} value={OPERATIONS.DIVISION} />

        <Key onClick={addInputValue} value='4' />
        <Key onClick={addInputValue} value='5' />
        <Key onClick={addInputValue} value='6' />
        <Key isOperator onClick={changeOperation} value={OPERATIONS.MULTIPLY} />

        <Key onClick={addInputValue} value='1' />
        <Key onClick={addInputValue} value='2' />
        <Key onClick={addInputValue} value='3' />
        <Key isOperator onClick={changeOperation} value={OPERATIONS.SUBTRACT} />

        <Key doubleSpace onClick={addInputValue} value='0' />
        <Key onClick={addDecimal} value=',' />
        <Key isOperator onClick={calculateResult} value='=' />
        <Key isOperator onClick={changeOperation} value={OPERATIONS.ADDITION} />
    </section>
)

KeyPad.propTypes = {
    addDecimal: PropTypes.func,
    addInputValue: PropTypes.func,
    calculateResult: PropTypes.func,
    changeOperation: PropTypes.func
}