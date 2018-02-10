import React, { Component } from 'react';
import PropTypes from 'prop-types'

function Article (props) {
  return (
    <section>
      <h2>{props.title}</h2>
      <p><em>Escrito por {props.author}</em></p>
      <date>{props.date}</date>
      <article>
        {props.children}
      </article>
    </section>
  )
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  children: PropTypes.any
}

const Button = ({ borderColor = 'red', label }) => (
  <button style={{ borderColor, display: 'block' }}>
    {label}
  </button>
)

Button.propTypes = {
  borderColor: PropTypes.string,
  label: PropTypes.string.isRequired
}

class StatelessWithPropTypes extends Component {
  render () {
    return (
      <div>
        <h4>Stateless components</h4>
        <Article
          author='Miguel'
          date={new Date().toLocaleDateString()}
          title='Artículo sobre la prop children'
        >
          <p>El contenido que envolvemos dentro del componente Article será enviado al componente como this.props.children.</p>
          <strong>Y mantiene las etiquetas y componentes que hayáis añadido dentro</strong>
        </Article>
        <br />
        <Button label='Comentar artículo' />
      </div>
    )
  }
}

export default StatelessWithPropTypes
