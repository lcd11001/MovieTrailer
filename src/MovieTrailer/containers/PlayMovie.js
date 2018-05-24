import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import MultiLinesGridList from '../components/MultiLinesGridList'
import ReviewCard from '../components/ReviewCard'

import IconButton from '@material-ui/core/IconButton'
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext'


import * as actions from '../redux/actions'

import { homeStyles as styles } from '../styles'

class PlayMovie extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            trailer: props.match.params.trailer,
            movieID: props.match.params.movieID
        }
    }

    render() {
        console.log('PlayMovie', this.props)
        const {
            fetch: {
                Loading,
                Error
            },
            classes,
            width,
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
                    <PaperSheet title={'PlayMovie page error'} description={Error} />
                </Fragment>
            )
        }

        return (
            <Fragment>
                <p>Playing...{this.state.movieID}</p>
            </Fragment>
        )
    }
}

PlayMovie.propTypes = {
    classes: PropTypes.object.isRequired
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

export default compose(withStyles(styles), withWidth(), connect(mapStateToProps, mapDispatchToProps))(PlayMovie)