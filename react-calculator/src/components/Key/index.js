import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Key = ({ isOperator, onClick, value }) => (
    <button
        className={`key ${isOperator ? 'key--operator' : ''}`}
        onClick={() => onClick(value)}>
        {value}
    </button>
)

Key.propTypes = {
    isOperator: PropTypes.bool,
    onClick: PropTypes.func,
    value: PropTypes.string,
}

Key.defaultProps = {
    onClick: () => {},
}

export { Key }