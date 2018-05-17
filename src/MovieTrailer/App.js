import React, { Component } from 'react'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import MovieDetail from './containers/MovieDetail'

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
                <Route exact path='/home' render={this._renderHome} />
                
                <Route path={`/:parent/movie/:movieID`} render={this._renderMovieDetail} />
                <Route path={`/movie/:movieID`} render={this._renderMovieDetail} />
            </Switch>
        )
    }
}
