import { ACTIONS, OPERATIONS } from '../constants'

const OPERATIONS_FUNCTIONS = {
    [OPERATIONS.MULTIPLY]: (a, b) => a * b,
    [OPERATIONS.ADDITION]: (a, b) => a + b,
    [OPERATIONS.SUBTRACT]: (a, b) => a - b,
    [OPERATIONS.DIVISION]: (a, b) => a / b
}

const initialState = {
    displayValue: undefined,
    hasDecimal: false,
    operation: undefined,
    refreshDisplayOnNextValue: false,
    storedValue: undefined
}

export default function calculator(state = initialState, { type, payload }) {
    console.log({type, payload})

    switch (type) {
        case ACTIONS.ADD_DECIMAL:
            if (state.hasDecimal) { return state }
            if (state.displayValue === undefined) { return state }

            return {
                ...state,
                hasDecimal: true,
                displayValue: state.displayValue + ','
            }

        case ACTIONS.ADD_INPUT_VALUE:
            if (state.displayValue === undefined && payload === '0') {
                return state
            }

            let newDisplayValue
            if (state.displayValue === undefined || state.refreshDisplayOnNextValue) {
                newDisplayValue = payload
            } else {
                newDisplayValue = state.displayValue + payload
            }

            return {
                ...state,
                refreshDisplayOnNextValue: false,
                displayValue: newDisplayValue
            }

        case ACTIONS.CHANGE_OPERATION:
            return {
                ...state,
                refreshDisplayOnNextValue: true,
                storedValue: parseInt(state.displayValue),
                operation: payload
            }

        case ACTIONS.CALCULATE_RESULT:
            const { displayValue, storedValue, operation } = state
            const operationMethod = OPERATIONS_FUNCTIONS[operation] || false
            if (operationMethod === false) { return state }
            
            const storedValueToUse = storedValue || parseInt(displayValue)
            const result = operationMethod(storedValueToUse, displayValue)
            const hasDecimal = result % 1 !== 0

            return {
                ...state,
                hasDecimal,
                displayValue: result.toString(),
                storedValue: undefined,
                operation: undefined
            }

        default:
            return state
    }
}