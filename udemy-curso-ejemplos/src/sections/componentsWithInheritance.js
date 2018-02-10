import React, { Component } from 'react';

// ¡ESTO ES UNA MALA PRACTICA Y SOLO ES PARA VER COMO FUNCIONARIA!

class Button extends Component {
  constructor (props) {
    super(props)
    this.borderColor = '#09f'
  }

  render () {
    return (
      <button style={{ borderColor: this.borderColor, display: 'block' }}>
        {this.props.label}
      </button>
    )
  }
}

class ButtonDanger extends Button {
  constructor (props) {
    super(props)
    this.borderColor = 'red'
  }
}

class ButtonWithLegend extends Button {
  render () {
    return (
      <div>
        {super.render()}
        <small>{this.props.legend}</small>
      </div>
    )
  }
}

class ComponentsWithInheritance extends Component {
  render () {
    return (
      <div>
        <h4>Composición vs. herencia (ejemplo de herencia)</h4>
        <Button label='Clic aquí' />
        <br />
        <ButtonDanger label='Danger!!!' />
        <br />
        <ButtonWithLegend
          label='Click con icono'
          legend='Click for test the button' />
      </div>
    );
  }
}

export default ComponentsWithInheritance;
