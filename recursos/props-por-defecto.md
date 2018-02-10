Añadiendo la propiedad `defaultProps` al componente Title, podemos indicar el valor por defecto que tendrán las props. En este caso hacemos que text tenga como valor por defecto el string "Titulo por defecto".

```javascript
import React from 'react'

class Title extends Component {
  render () {
    return <h1>{this.props.text}</h1>
  }
}

Title.defaultProps = {
  text: 'Titulo por defecto'
}
```

Esto es muy útil si queréis controlar que una prop tenga un valor aunque al usar el componente alguien no le haya pasado un valor o para simplificar su uso. Se suele hacer también para props que son requeridas y, que en caso que no se pasen, al menos el componente no dé un error.