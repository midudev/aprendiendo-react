import React, { Component } from 'react'

class Constructor extends Component {
  /* constructor por defecto
  constructor (...args) {
    super(...args)
  }
  */

  constructor (props) {
    console.log('constructor')
    super(props) // este método llama al constructor de Component
    // inicializamos el state de nuestro componente
    this.state = { mensajeInicial: 'mensaje inicial' }
    // bindeamos el contexto al método
    // this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    this.setState({ mensajeInicial: 'mensaje cambiado' })
  }

  render () {
    console.log('render')
    return (
      <div className="App">
        <h4>Ciclo de montaje: constructor</h4>
        {this.state.mensajeInicial}
        <button onClick={this.handleClick}>
          Cambiar mensaje
        </button>
      </div>
    );
  }
}

export default Constructor;
