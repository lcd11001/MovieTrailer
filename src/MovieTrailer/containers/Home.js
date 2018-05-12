import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';

import SingleLineGridList from '../components/SingleLineGridList'
import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import Carousel from '../components/Carousel'

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
                    <CircularLoading />
                </Fragment>
            )
        }

        if (Error) {
            return (
                <Fragment>
                    <PaperSheet title={'Home page error'} description={Error}/>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <Carousel />
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
