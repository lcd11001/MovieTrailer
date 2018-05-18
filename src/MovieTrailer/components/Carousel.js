

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

import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import InfoIcon from '@material-ui/icons/Info'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import { store } from '../redux/store'
import { push } from 'react-router-redux'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.main,
        whiteSpace: 'nowrap',
        textShadow: `${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        fontSize: '3.0rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '1.0rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.5rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '2.0rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '2.5rem'
        }
    },
    subtitle: {
        color: theme.palette.primary.light,
        whiteSpace: 'nowrap',
        textShadow: `${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        fontSize: '2.5rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.5rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '1.0rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '1.5rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '2.0rem'
        }
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        height: 130,
        // extra small
        [theme.breakpoints.only('xs')]: {
            height: 50,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            height: 70,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            height: 90,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            height: 110,
        }
    },
    divImage: {
        height: '100%',
        width: '100%'
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
    },
    divActionIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center',
        // backgroundColor: '#F00',
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
    },
})

const _onImageError = (error) => {
    error.target.src = '/defaultImage/unavailable.png'
}

const _onInfoClicked = (movieID) => {
    let url = '/movie/' + movieID
    store.dispatch(push(url))
}

const _calcCellHeigh = (cellHeight, width) => {
    switch (width){
        case 'xs': // extra small
            return parseInt(cellHeight * 0.2, 10)

        case 'sm': // small
            return parseInt(cellHeight * 0.4, 10)
        
        case 'md': // medium
            return parseInt(cellHeight * 0.6, 10)
        case 'lg': // large
            return parseInt(cellHeight * 0.8, 10)
        // case 'xl': // xlarge
        //     return parseInt(cellHeight, 10)
        default:
            break
    }

    return parseInt(cellHeight, 10)
}

function Carousel(props) {
    // console.log('Carousel', props)
    const { 
        classes, 
        data,
        cellHeight,
        width,
    } = props

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5} cellHeight={_calcCellHeigh(cellHeight, width)}>
                {data.map(movie => (
                    <GridListTile key={movie.MovieID}>
                        <div className={classes.divImage}>
                            <img className={classes.image} src={movie.Cover} alt={movie.MovieName} onError={_onImageError} />
                            <div className={classes.divActionIcon}>
                                <IconButton>
                                    <FavoriteBorderIcon color='secondary'/>
                                </IconButton>
                                
                                <IconButton onClick={() => _onInfoClicked(movie.MovieID)}>
                                    <InfoIcon color='primary'/>
                                </IconButton>
                            </div>
                        </div>
                        <GridListTileBar
                            title={
                                <Typography className={classes.title}>
                                    {movie.KnownAs}
                                </Typography>
                            }
                            subtitle={
                                <Typography className={classes.subtitle}>
                                    {movie.MovieName}
                                </Typography>
                            }
                            classes={{
                                root: classes.titleBar
                            }}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

Carousel.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    cellHeight: PropTypes.number.isRequired
}

export default compose ( withStyles(styles), withWidth() )(Carousel)