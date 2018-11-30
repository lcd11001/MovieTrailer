import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import MultiLinesGridList from '../components/MultiLinesGridList'
import MoviePlayer from '../components/MoviePlayer'

import IconButton from '@material-ui/core/IconButton'
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext'

import * as actions from '../redux/actions'

import { playerStyles as styles, homeStyles, loadingStyles } from '../styles'

class PlayMovie extends React.Component {
    componentWillMount() {
        console.log('PlayMovie::componentWillMount', this.props)
        const {
            user: {
                isLogged
            },
            match: {
                params: {
                    movieID
                },
                path
            }
        } = this.props

        if (isLogged && path === '/play/:movieID') {
            this.props.playMovie(movieID)
        }
        this.props.loadMovieDetail(movieID)
    }

    _renderEpisode = (Episode, Sequence) => {
        const { classes } = this.props
        const buttons = []

        for (let i = 0; i < Episode; i++) {
            if (i > Sequence) {
                buttons.push(
                    <Button key={i} size="small" variant="outlined" disabled className={classes.button}>
                        Tập {i}
                    </Button>
                )
            } else {
                buttons.push(
                    <Button key={i} size="small" variant="outlined" color="primary" className={classes.button}>
                        Tập {i}
                    </Button>
                )
            }
        }

        return buttons
    }

    render() {
        // console.log('PlayMovie', this.props, this.state)
        const {
            fetch: {
                Loading,
                Error
            },
            classes,
            detail,
            play,
            user,
            match: {
                path
            }
        } = this.props

        if (Error) {
            return (
                <Fragment>
                    <PaperSheet title={'PlayMovie page error'} description={Error} />
                </Fragment>
            )
        }

        let isLoading = Loading || detail === null
        if (user.isLogged && path === '/play/:movieID') {
            isLoading |= (play === null)
        }

        if (isLoading) {
            return (
                <div className={classes.loading}>
                    <CircularLoading />
                </div>
            )
        }

        let movieUrl = user.isLogged && path === '/play/:movieID'
            ? play.playList
            : detail.Trailer

        return (
            <Fragment>
                {
                    <MoviePlayer url={movieUrl} />
                }
                {
                    detail && (
                        <Fragment>
                            <Typography className={classes.title}>{detail.KnownAs}</Typography>
                            <Typography className={classes.subtitle}>{detail.MovieName || detail.Name}</Typography>
                        </Fragment>
                    )
                }

                {
                    detail && detail.Episode > 0 && (
                        this._renderEpisode(detail.Episode, detail.Sequence)
                    )
                }

                {
                    detail && (
                        <Fragment>
                            <div className={classes.divHeader}>
                                <IconButton>
                                    <QueuePlayNextIcon className={classes.moreIcon} />
                                </IconButton>
                                <Typography className={classes.header}>
                                    Phim liên quan:
                                </Typography>
                            </div>
                            <MultiLinesGridList data={detail.Relative} cols={7} cellHeight={300} />
                        </Fragment>
                    )
                }
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
        play: state.movies.MoviePlay,
        user: state.user
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        loadMovieDetail: (movieID) => {
            dispatch(actions.loadMovieDetail(movieID))
        },
        playMovie: (movieID, sequence) => {
            dispatch(actions.playMovie(movieID, sequence))
            // console.warn('playMovie ' + movieID + 'sequence ' + sequence)
        }
    }
)

export default compose(withStyles(styles), withStyles(homeStyles), withStyles(loadingStyles), withWidth(), connect(mapStateToProps, mapDispatchToProps))(PlayMovie)