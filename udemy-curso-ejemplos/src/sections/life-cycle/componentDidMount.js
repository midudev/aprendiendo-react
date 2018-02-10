import React, { Component } from 'react'

class EjemploDeComponentDidMount extends Component {
  constructor (props) {
    console.log('constructor')
    super(props)
    this.state = { scroll: 0 }
  }

  componentWillMount () {
    console.log('componentWillMount')
  }

  componentDidMount () {
    console.log('componentDidMount')
    document.addEventListener('scroll', () => {
      this.setState({ scroll: window.scrollY })
    })
  }

  render () {
    console.log('render')
    return (
      <div>
        <h4>Ciclo de montaje: componentDidMount</h4>
        <p>El scroll es {this.state.scroll}</p>
        <p>Este componente nos muestra como podemos usar el componentDidMount.</p>
        <p>Como queremos añadir un evento al scroll, vamos a hacer que la ventana sea lo suficientemente grande como para que tenga que empujar el contenido hacia abajo y haga que no quepa todo el contenido en el alto de la página. De esta forma podremos utilizar el evento para controlar cuando el usuario está moviéndose por el scroll.</p>
        <p>Lorem fistrum benemeritaar condemor torpedo diodenoo me cago en tus muelas no puedor al ataquerl llevame al sircoo apetecan. Ahorarr ahorarr llevame al sircoo está la cosa muy malar. Diodenoo jarl caballo blanco caballo negroorl ese pedazo de ese hombree amatomaa papaar papaar ese pedazo de. Hasta luego Lucas por la gloria de mi madre se calle ustée hasta luego Lucas torpedo llevame al sircoo por la gloria de mi madre ahorarr diodeno a peich a wan. Papaar papaar está la cosa muy malar no te digo trigo por no llamarte Rodrigor condemor de la pradera hasta luego Lucas.</p>
        <p>Fistro hasta luego Lucas te va a hasé pupitaa me cago en tus muelas. A wan diodeno diodeno torpedo. Pupita a gramenawer tiene musho peligro mamaar ese que llega papaar papaar diodeno diodenoo pecador. Mamaar fistro no puedor hasta luego Lucas condemor pupita ese pedazo de me cago en tus muelas benemeritaar. A wan jarl tiene musho peligro ahorarr torpedo pupita por la gloria de mi madre.</p>
      </div>
    )
  }
}

export default EjemploDeComponentDidMount
