import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import { store, history } from '../redux/store'
import { NavLink as Link } from 'react-router-dom'

import { Button } from '@material-ui/core'

import * as actions from '../redux/actions'

const styles = theme => ({
})

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

const mapStateToProps = (state) => (
    {
        fetch: state.fetch,
        movies: state.movies,
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        loadHomeMovies: () => {
            dispatch(actions.loadHomeMovies())
        }
    }
)

export default compose ( withStyles(styles), withWidth(), connect(mapStateToProps, mapDispatchToProps) ) (MovieDetail)