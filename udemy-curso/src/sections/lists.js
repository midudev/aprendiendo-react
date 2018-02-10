import React, { Component } from 'react';
import cars from '../data/cars.json'

class CarItem extends Component {
  render () {
    const { car, id } = this.props

    return (
      <li>
        <p>Key: {id}</p>
        <p><strong>Nombre: </strong>{car.name}</p>
        <p><strong>Marca: </strong>{car.company}</p>
      </li>
    )
  }
}

export default class CarsList extends Component {
  render () {
    return (
      <ul>
        {
          cars.map(car => {
            return <CarItem id={car.id} key={car.id} car={car} />
          })
        }
      </ul>
    )
  }
}
