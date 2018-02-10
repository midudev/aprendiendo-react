import React, { Component } from 'react'

class ComponentWillMount extends Component {
  constructor (props) {
    console.log('constructor')
    super(props)
    this.state = { mensaje: 'mensaje inicial' }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.setState({ mensaje: 'otro mensaje' })
  }

  render () {
    console.log('render')
    return (
      <div>
        <h4>Ciclo de montaje: componentWillMount</h4>
        <p>{this.state.mensaje}</p>
      </div>
    )
  }
}

export default ComponentWillMount
