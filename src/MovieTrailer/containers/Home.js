import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import Modal from '@material-ui/core/Modal'

import IconButton from '@material-ui/core/IconButton'
import MoreIcon from '@material-ui/icons/More'

import SingleLineGridList from '../components/SingleLineGridList'
import MultiLinesGridList from '../components/MultiLinesGridList'
import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import Carousel from '../components/Carousel'
import ReviewCard from '../components/ReviewCard'

import * as actions from '../redux/actions'

import { homeStyles as styles } from '../styles'

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            needRefresh: props.movies.Banner.length === 0,
            showReview: 0
        }
        // console.log('Home constructor', this.state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate', 'nextProps', nextProps, 'nextState', nextState)
        return nextState.needRefresh
    }

    componentDidMount() {
        // console.log('componentDidMount')
        if (this.state.needRefresh) {
            this.props.loadHomeMovies()
        }
    }

    componentWillUnmount() {
        this.props.clearMovieDetail()
    }

    _onInfoClicked = (movieID) => {
        console.log("Home on info click ", movieID)
        this.setState({
            showReview: movieID
        })

        this.props.loadMovieDetail(movieID)
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
            height: `${height}%`,
            // backgroundColor: 'rgba(255, 0, 0, 0.5)'
        };
    }

    _handleClose = () => {
        this.setState({
            showReview: 0
        })

        this.props.clearMovieDetail()
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
                <Carousel data={Banner} cellHeight={500}/>

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
                    open={showReview !== 0}
                    onClose={this._handleClose}
                >
                    <div style={this._getModalStyle()}>
                        <ReviewCard detail={this.props.detail} onPlay={this._onPlayMovie}/>
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
        detail: state.movies.MovieDetail,
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

export default compose ( withStyles(styles), withWidth(), connect(mapStateToProps, mapDispatchToProps) ) (Home)
