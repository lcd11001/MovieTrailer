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

const styles = theme => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
    },
    divHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: theme.palette.primary.light,
        width: '100%',
        alignItems: 'center'
    },
    header: {
        color: theme.palette.text.primary,
        whiteSpace: 'normal',
        textShadow: `${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px, ${theme.palette.text.secondary} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        fontSize: '2.0rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.8rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.1rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '1.4rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '1.7rem'
        }
    },
})

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

        console.log(width)

        return (
            <Fragment>
                <ReviewCard detail={detail} />
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