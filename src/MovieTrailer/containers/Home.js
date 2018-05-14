import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import SingleLineGridList from '../components/SingleLineGridList'
import CircularLoading from '../components/CircularLoading'
import PaperSheet from '../components/PaperSheet'
import Carousel from '../components/Carousel'

import { loadHomeMovies } from '../redux/actions/moviesActions'

const styles = theme => ({
    loading: {
        display: 'flex',
        justifyContent: 'center',
    },
})

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
            },
            classes
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
                    <PaperSheet title={'Home page error'} description={Error}/>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <Carousel data={Banner}/>

                {
                    Categories.map(({
                        CategoryName,
                        Movies
                    }) => (
                        <Fragment key={CategoryName}>
                            <Typography variant='headline' gutterBottom>
                                {CategoryName}
                            </Typography>
                            <SingleLineGridList data={Movies}/>
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

export default withStyles(styles)( connect(mapStateToProps, mapDispatchToProps)(Home) )
