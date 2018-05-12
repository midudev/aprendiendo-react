import { ACTIONS } from '../constants'

export const addDecimal = payload => ({ type: ACTIONS.ADD_DECIMAL, payload })
export const addInputValue = payload => ({ type: ACTIONS.ADD_INPUT_VALUE, payload })
export const changeOperation = payload => ({ type: ACTIONS.CHANGE_OPERATION, payload })
export const calculateResult = payload => ({ type: ACTIONS.CALCULATE_RESULT, payload })