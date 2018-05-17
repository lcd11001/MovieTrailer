import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import { store, history } from '../redux/store'

import { Button } from '@material-ui/core'
import SingleLineGridList from '../components/SingleLineGridList'
import MultiLinesGridList from '../components/MultiLinesGridList'
import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import Carousel from '../components/Carousel'

import * as actions from '../redux/actions'

const styles = theme => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
    },
})

class MovieDetail extends Component {
    componentDidMount() {
        this.props.loadMovieDetail(this.props.match.params.movieID)
    }

    render() {
        console.log('MovieDetail', this.props)
        const {
            fetch: {
                Loading,
                Error
            },
            match: {
                url,
                params: {
                    parent = this.props.match.params.parent || '/',
                    movieID
                }
            },
            classes,
            width,
            detail
        } = this.props

        if (Loading) {
            return (
                <div className={classes.loading}>
                    <CircularLoading />
                </div>
            )
        }

        if (Error) {
            return (
                <Fragment>
                    <PaperSheet title={'MovieDetail page error'} description={Error}/>
                </Fragment>
            )
        }

        return (
            <div>
                <h1>{detail.KnownAs}</h1>
                <p>{detail.PlotVI}</p>

                <Button onClick={() => {history.goBack()}}>Go Back</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        fetch: state.fetch,
        detail: state.movies.MovieDetail,
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        loadMovieDetail: (movieID) => {
            dispatch(actions.loadMovieDetail(movieID))
        }
    }
)

export default compose ( withStyles(styles), withWidth(), connect(mapStateToProps, mapDispatchToProps) ) (MovieDetail)