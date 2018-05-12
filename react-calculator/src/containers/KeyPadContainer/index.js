import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CalculatorActions from '../../actions'
import { KeyPad } from '../../components/KeyPad'

const mapDispatchToProps = dispatch =>
    bindActionCreators(CalculatorActions, dispatch)

export const KeyPadContainer = connect(
  null,
  mapDispatchToProps
)(KeyPad)
