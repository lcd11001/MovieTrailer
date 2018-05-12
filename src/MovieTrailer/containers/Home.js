import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import SingleLineGridList from '../components/SingleLineGridList'

import { loadHomeMovies } from '../redux/actions/moviesActions'

class Home extends Component {
    componentDidMount() {
        this.props.loadHomeMovies()
    }

    render() {
        const { 
            fetch: {
                Loading,
                Error
            },
            movies: {
                Banner,
                Categories,
            }
        } = this.props

        if (Loading) {
            return (
                <Fragment>
                    <p>Loading</p>
                </Fragment>
            )
        }

        if (Error) {
            return (
                <Fragment>
                    <p>Error {Error}</p>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <SingleLineGridList data={Banner}/>
            </Fragment>
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
            dispatch(loadHomeMovies())
        }
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
