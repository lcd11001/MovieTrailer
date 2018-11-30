import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'

import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/More'

// import SingleLineGridList from '../components/SingleLineGridList'
import MultiLinesGridList from '../components/MultiLinesGridList'
import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import CarouselView from '../components/Carousel'
import ReviewCard from '../components/ReviewCard'

import { store } from '../redux/store'
import { push } from 'react-router-redux'

import * as actions from '../redux/actions'

import { homeStyles as styles, loadingStyles } from '../styles'

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            showReview: false,
        }
        // console.log('Home constructor', this.state)
    }

    componentDidMount() {
        // console.log('componentDidMount')
        if (this.props.movies.Banner.length === 0) {
            this.props.loadHomeMovies()
        }
    }

    _onInfoClicked = (movieID) => {
        // console.log("Home on info click ", movieID)
        if (this.props.movies.MovieDetail === null || movieID !== this.props.movies.MovieDetail.MovieID) {
            this.props.clearMovieDetail()
            this.props.loadMovieDetail(movieID)
        }

        this.setState({
            showReview: true
        })
    }

    _onPlayMovie = (movieID, trailer) => {
        let url = this.props.user.isLogged 
            ? '/play/' + movieID
            : '/trailer/' + btoa(encodeURI(trailer)).replace(/\//g, '-') + '/' + movieID

        store.dispatch(push(url))
    }

    _getModalStyle = () => {
        const top = 10
        const left = 10
        const width = 80
        const height = 80

        return {
            position: 'absolute',
            overflowY: 'auto',
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}%`,
            maxHeight: `${height}%`,
            // backgroundColor: 'rgba(255, 0, 0, 0.5)'
        };
    }

    _handleClose = () => {
        this.setState({
            showReview: false
        })
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
                MovieDetail
            },
            classes
        } = this.props

        const {
            showReview
        } = this.state

        // console.log('Home', this.props)

        

        if (Error) {
            return (
                <Fragment>
                    <PaperSheet title={'Home page error'} description={Error}/>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <CarouselView data={Banner} onInfoClicked={this._onInfoClicked}/>

                {
                    Categories.map(({
                        CategoryName,
                        Movies
                    }) => (
                        <Fragment key={CategoryName}>
                            <div className={classes.divHeader}>
                                <IconButton>
                                    <MoreIcon className={classes.moreIcon}/>
                                </IconButton>
                                <Typography className={classes.header}>
                                    {CategoryName}
                                </Typography>
                            </div>
                            {/* <SingleLineGridList data={Movies} cols={8.5} cellHeight={300}/> */}
                            <MultiLinesGridList data={Movies} cols={7} cellHeight={300} onInfoClicked={this._onInfoClicked}/>
                        </Fragment>
                    ))
                }

                <Modal 
                    open={showReview}
                    onClose={this._handleClose}
                    disableAutoFocus={true}
                >
                    <div style={this._getModalStyle()}>
                        {
                            MovieDetail && (
                                <ReviewCard detail={MovieDetail} onPlay={this._onPlayMovie}/>
                            )
                        }
                    </div>
                </Modal>
                
                {
                    Loading && (
                        <div className={classes.loading}>
                            <CircularLoading />
                        </div>
                    )
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => (
    {
        fetch: state.fetch,
        movies: state.movies,
        user: state.user
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        loadHomeMovies: () => {
            dispatch(actions.loadHomeMovies())
        },
        clearMovieDetail: () => {
            dispatch(actions.clearMovieDetail())
        },
        loadMovieDetail: (movieID) => {
            dispatch(actions.loadMovieDetail(movieID))
        }
    }
)

export default compose ( withStyles(styles), withStyles(loadingStyles), withWidth(), connect(mapStateToProps, mapDispatchToProps) ) (Home)
