import React, { Component } from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import MovieDetail from './containers/MovieDetail'
import { NotFound } from './components/errors'

export default class App extends Component {
    _renderHome = (props) => (
        <Home {...props} />
    )

    _renderMovieDetail = (props) => (
        <MovieDetail {...props} />
    )

    render() {
        return (
            <Switch>
                <Route exact path='/' render={this._renderHome} />
                <Route exact path={`/movie/:movieID`} render={this._renderMovieDetail} />

                <Route component={NotFound} />
            </Switch>
        )
    }
}
