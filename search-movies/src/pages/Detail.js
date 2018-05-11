import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ButtonBackToHome } from '../components/ButtonBackToHome'

const API_KEY = '4287ad07'

export class Detail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  state = { movie: {} }

  _fetchMovie ({ id }) {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then(res => res.json())
      .then(movie => {
        console.log({ movie })
        this.setState({ movie })
      })
  }

  componentDidMount () {
    console.log(this.props)
    const { movieId } = this.props.match.params
    this._fetchMovie({ id: movieId })
  }

  render () {
    const { Title, Poster, Actors, Metascore, Plot } = this.state.movie

    return (
      <div>
        <ButtonBackToHome />
        <h1>{Title}</h1>
        <img src={Poster} />
        <h3>{Actors}</h3>
        <span>{Metascore}</span>
        <p>{Plot}</p>
      </div>
    )
  }
}
