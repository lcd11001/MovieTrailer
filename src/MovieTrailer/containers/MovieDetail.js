import React, { Component, Fragment } from 'react'
import { store, history } from '../redux/store'
import { NavLink as Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

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
                <Link to={parent !== '/' ? `/${parent}` : parent}>Back to {parent}</Link>
                <Button onClick={() => {history.goBack()}}>Go Back</Button>
            </div>
        )
    }
}

export default MovieDetail