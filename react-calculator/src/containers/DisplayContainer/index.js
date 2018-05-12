import { connect } from 'react-redux'
import { Display } from '../../components/Display'

const mapStateToProps = state => ({
    value: state.displayValue
})

export const DisplayContainer = connect(
    mapStateToProps,
    null
)(Display)
