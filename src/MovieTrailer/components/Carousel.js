

/**
 * data = [
 *      {
 *          CategoryName: 'Hành động',
 *          Cover: 'http://t.hdviet.com/backdrops/origins/bf4601ed955c4482e58dce7dbbccb227.jpg',
 *          KnownAs: 'Ám Ảnh Xác Sống (Phần 4)',
 *          MovieID: '13877',
 *          MovieName: 'Fear The Walking Dead (Season 4)',
 *          Movielink: 'http://movies.hdviet.com/fear-the-walking-dead-season-4_13877.html',
 *          Slug: 'phim-am-anh-xac-song-phan-4-fear-the-walking-dead-season-4.html'
 *      },
 *      ...
 * ]
 * 
 */

import React from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import InfoIcon from '@material-ui/icons/Info'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import Carousel from 'nuka-carousel'
import classnames from 'classnames'

import { store } from '../redux/store'
import { push } from 'react-router-redux'

import { carouselStyles as styles } from '../styles'

const _onImageError = (error) => {
    error.target.src = '/defaultImage/unavailable.png'
}

const _onInfoClicked = (movieID) => {
    let url = '/movie/' + movieID
    store.dispatch(push(url))
}

function CarouselView(props) {
    // console.log('CarouselView', props)
    const { 
        classes, 
        data,
        width,
        onInfoClicked = props.onInfoClicked || _onInfoClicked
    } = props

    if (data === null) {
        return  null
    }

    if (data.length === 0) {
        return null
    }
    
    return (
        <div className={classes.divCarousel}>
            <Carousel 
                autoplay={false}
                heightMode={'max'}
                width={'90%'}
                className={classes.carousel}
            >
            {
                data.map((movie, index) => {
                    return (
                        <div className={classes.divSlider}>
                            <div className={classes.divImage}>
                                <img className={classes.image} src={movie.Cover} alt={movie.MovieName} onError={_onImageError} />
                                <div className={classes.divActionIcon}>
                                    <IconButton>
                                        <FavoriteBorderIcon color='secondary'/>
                                    </IconButton>
                                    
                                    <IconButton onClick={() => onInfoClicked(movie.MovieID)}>
                                        <InfoIcon color='primary'/>
                                    </IconButton>
                                </div>
                            </div>
                            
                            <div className={classnames(classes.divTitle, classes.titleBar)}>
                                <Typography className={classes.title}>
                                    {movie.KnownAs}
                                </Typography>
                            
                                <Typography className={classes.subtitle}>
                                    {movie.MovieName}
                                </Typography>
                            </div>
                        </div>
                    )
                    
                })
            }
            </Carousel>
        </div>
    )
}

CarouselView.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
}

export default compose ( withStyles(styles), withWidth() )(CarouselView)