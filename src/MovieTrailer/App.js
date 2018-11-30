import React, { Component } from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
// import Home from './containers/Home'
import MovieDetail from './containers/MovieDetail'
import PlayMovie from './containers/PlayMovie'

import Home from './drawer_containers/Home'

import { NotFound } from './components/errors'

export default class App extends Component {
    _renderHome = (props) => (
        <Home {...props} />
    )

    _renderMovieDetail = (props) => (
        <MovieDetail {...props} />
    )

    _renderPlayMovie = (props) => (
        <PlayMovie {...props} />
    )

    render() {
        return (
            <Switch>
                <Route exact path='/' render={this._renderHome} />
                <Route exact path={`/movie/:movieID`} render={this._renderMovieDetail} />
                <Route exact path={`/play/:movieID`} render={this._renderPlayMovie} />
                <Route exact path={`/trailer/:url/:movieID`} render={this._renderPlayMovie} />

                <Route component={NotFound} />
            </Switch>
        )
    }
}
