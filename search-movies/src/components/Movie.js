import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Movie extends Component {
  static propTypes = {
    title: PropTypes.string,
    year: PropTypes.string,
    poster: PropTypes.string
  }

  render () {
    const { poster, title, year } = this.props

    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img
              alt={title}
              src={poster}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{title}</p>
              <p className="subtitle is-6">{year}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
