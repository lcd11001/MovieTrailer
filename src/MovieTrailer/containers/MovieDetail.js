import React, { Component, Fragment } from 'react'

class MovieDetail extends Component {
    render() {
        console.log('MovieDetail', this.props)
        const {
            match: {
                url,
                params: {
                    parent = this.props.match.params.parent || '/',
                    movieID
                }
            }
        } = this.props

        return (
            <div>
                <h1>Movie detail {movieID}</h1>
                <h2>Back to {parent}</h2>
            </div>
        )
    }
}

export default MovieDetail