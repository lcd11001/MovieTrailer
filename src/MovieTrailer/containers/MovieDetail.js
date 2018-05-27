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

import { store } from '../redux/store'
import { push } from 'react-router-redux'

import * as actions from '../redux/actions'

import { homeStyles as styles } from '../styles'

class MovieDetailCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            movieID: props.match.params.movieID
        }
    }



    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            movieID: nextProps.match.params.movieID
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.movieID !== this.state.movieID) {
            this.props.loadMovieDetail(nextState.movieID)
        }

        return true
    }

    componentDidMount() {
        this.props.loadMovieDetail(this.state.movieID)
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    _onPlayMovie = (movieID, trailer) => {
        let url = trailer 
            ? '/trailer/' + btoa(encodeURI(trailer)).replace(/\//g, '-')
            : '/play/' + movieID

        store.dispatch(push(url))
    }

    render() {
        // console.log('MovieDetail', this.props)
        const {
            fetch: {
                Loading,
                Error
            },
            classes,
            width,
            detail
        } = this.props

        if (Loading || detail === null) {
            return (
                <div className={classes.loading}>
                    <CircularLoading />
                </div>
            )
        }

        if (Error) {
            return (
                <Fragment>
                    <PaperSheet title={'MovieDetail page error'} description={Error} />
                </Fragment>
            )
        }

        return (
            <Fragment>
                <ReviewCard detail={detail} onPlay={this._onPlayMovie}/>
                <div className={classes.divHeader}>
                    <IconButton>
                        <QueuePlayNextIcon color='primary' />
                    </IconButton>
                    <Typography className={classes.header}>
                        Phim liên quan:
                    </Typography>
                </div>
                <MultiLinesGridList data={detail.Relative} cols={7} cellHeight={300} />
            </Fragment>
        )
    }
}

MovieDetailCard.propTypes = {
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

export default compose(withStyles(styles), withWidth(), connect(mapStateToProps, mapDispatchToProps))(MovieDetailCard)