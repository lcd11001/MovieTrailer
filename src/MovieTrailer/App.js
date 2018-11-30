import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
// import Home from './containers/Home'
import MovieDetail from './containers/MovieDetail'
import PlayMovie from './containers/PlayMovie'

import Home from './drawer_containers/Home'

import { NotFound } from './components/errors'

export default class App extends Component {
    _renderHome = (props) => {
        const { classes, ...other } = props
        return (
            <Home {...other} />
        )
    }

    _renderMovieDetail = (props) => {
        const { classes, ...other } = props
        return (
            <MovieDetail {...other} />
        )
    }

    _renderPlayMovie = (props) => {
        const { classes, ...other } = props
        return (
            <PlayMovie {...other} />
        )
    }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/home' />} />
                    <Route exact path='/home' render={this._renderHome} />
                    <Route exact path={`/movie/:movieID`} render={this._renderMovieDetail} />
                    <Route exact path={`/play/:movieID`} render={this._renderPlayMovie} />
                    <Route exact path={`/trailer/:url/:movieID`} render={this._renderPlayMovie} />

                    <Route component={NotFound} />
                </Switch>
            </Fragment>
        )
    }
}
