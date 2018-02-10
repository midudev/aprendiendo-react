import React, { Component } from 'react';

class Button extends Component {
  render () {
    return (
      <button style={{ borderColor: this.props.borderColor, display: 'block' }}>
        {this.props.label}
      </button>
    )
  }
}

Button.defaultProps = {
  borderColor: '#09f'
}

class ButtonDanger extends Component {
  render () {
    return <Button borderColor='red' label={this.props.label} />
  }
}

class ButtonWithLegend extends Component {
  render () {
    return (
      <div>
        <Button label={this.props.label} borderColor={this.props.borderColor} />
        <small>{this.props.legend}</small>
      </div>
    )
  }
}

class ComponentsWithComposition extends Component {
  render () {
    return (
      <div>
        <h4>Composición vs. herencia (ejemplo de composición)</h4>
        <Button label='Click aqui con composición' />
        <br />
        <ButtonDanger label='Cuidado con composición!!' />
        <br />
        <ButtonWithLegend
          label='Boton con explicación con composición'
          legend='Clicka el botón para hacer algo' />
      </div>
    );
  }
}

export default ComponentsWithComposition;
