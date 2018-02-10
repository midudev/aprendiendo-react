import React, { Component } from 'react'

export default class Events extends Component {
  constructor () {
    super()
    this.state = { mouseX: 0, mouseY: 0 }
    // this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleMouseMove = (e) => {
    const { clientX, clientY } = e
    this.setState({ mouseX: clientX, mouseY: clientY })
  }

  handleClick (e) {
    console.log(e)
    console.log(e.nativeEvent)
    alert('Hi here!')
  }

  render () {
    return (
      <div>
        <h4>Eventos</h4>
        <button onClick={this.handleClick}>Hi there!</button>
        <div
          onMouseMove={this.handleMouseMove}
          style={{ border: '1px solid #000', marginTop: 10, padding: 10 }}>
          <p>{this.state.mouseX}, {this.state.mouseY}</p>
        </div>
      </div>
    )
  }
}
