import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import SingleLineGridList from '../components/SingleLineGridList'

import { loadHomeMovies } from '../redux/actions/moviesActions'

class Home extends Component {
    componentDidMount() {
        this.props.loadHomeMovies()
    }

    render() {
        const { 
            movies: {
                Banner,
                Categories,
                Loading,
                Error
            }
        } = this.props

        if (Loading) {
            return (
                <Fragment>
                    <p>Loading</p>
                </Fragment>
            )
        }

        const tileData = [
            {
                img: 'http://gocbao.com/wp-content/uploads/2017/12/bieu-tuong-cam-xuc-va-icon-facbook-8.jpg',
                title: 'Image',
                author: 'author',
            },
        ]
        return (
            <Fragment>
                <p>Finish loading</p>
                <SingleLineGridList tileData={tileData}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => (
    {
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
