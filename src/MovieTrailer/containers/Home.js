import React, { Component, Fragment } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { NavLink as Link, Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import SingleLineGridList from '../components/SingleLineGridList'
import MultiLinesGridList from '../components/MultiLinesGridList'
import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import Carousel from '../components/Carousel'

import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/More';

import { loadHomeMovies } from '../redux/actions/moviesActions'

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
        fontSmoothing: 'antialiased'
    },
})

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            needRefresh: props.movies.Banner.length == 0
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
            match: {
                url
            },
            classes
        } = this.props

        // console.log('Home', this.props)

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
                    <PaperSheet title={'Home page error'} description={Error}/>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <Carousel {...{match: this.props.match}} data={Banner}/>

                {
                    Categories.map(({
                        CategoryName,
                        Movies
                    }) => (
                        <Fragment key={CategoryName}>
                            <div className={classes.divHeader}>
                                <IconButton>
                                    <MoreIcon color='primary'/>
                                </IconButton>
                                <Typography className={classes.header} variant='headline'>
                                    {CategoryName}
                                </Typography>
                            </div>
                            {/* <SingleLineGridList {...{match: this.props.match}} data={Movies} cols={8.5} cellHeight={300}/> */}
                            <MultiLinesGridList {...{match: this.props.match}} data={Movies} cols={5} cellHeight={300}/>
                        </Fragment>
                    ))
                }
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

export default compose (withStyles(styles), connect(mapStateToProps, mapDispatchToProps) ) (Home)
