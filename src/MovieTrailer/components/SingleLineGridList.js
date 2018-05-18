

/**
 * data = [
 *      {
 *          CategoryID : '45,74,37,83,34,53,41,44',
 *          KnownAs: 'Thủy Hử Nhí (Thuyết Minh)',
 *          MovieID: '13947',
 *          MovieName: 'All Men Are Brothers Kids',
 *          Poster100x149: 'http://t.hdviet.com/thumbs/100x149/961aaf0cb9824
 *      },
 *      ...
 * ]
 * 
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { store } from '../redux/store'
import { push } from 'react-router-redux'

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
        fontSize: '1.4rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.6rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '0.8rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '1rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '1.2rem'
        }
    },
    subtitle: {
        color: theme.palette.primary.light,
        whiteSpace: 'nowrap',
        textShadow: `${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px`,
        fontSmoothing: 'antialiased',
        fontSize: '1.3rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.5rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '0.7rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '0.9rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '1.1rem'
        }
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        height: 80,
        // extra small
        [theme.breakpoints.only('xs')]: {
            height: 40,
        },
        // small
        [theme.breakpoints.only('sm')]: {
            height: 50,
        },
        // medium
        [theme.breakpoints.only('md')]: {
            height: 60,
        },
        // large
        [theme.breakpoints.only('lg')]: {
            height: 70,
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
    }
})

const _onImageError = (error) => {
    error.target.src = './defaultImage/unavailable.png'
}

const _onInfoClicked = (baseUrl, movieID) => {
    let url = baseUrl !== '/' 
        ? baseUrl + '/movie/' + movieID 
        : '/movie/' + movieID

    store.dispatch(push(url))
}

const _calcCellHeigh = (cellHeight, width) => {
    switch (width){
        case 'xs': // extra small
            return parseInt(cellHeight * 0.4)

        case 'sm': // small
            return parseInt(cellHeight * 0.55)
        
        case 'md': // medium
            return parseInt(cellHeight * 0.7)
        case 'lg': // large
            return parseInt(cellHeight * 0.85)
        // case 'xl': // xlarge
        //     return parseInt(cellHeight)
        default:
            break
    }

    return cellHeight
}

const _calcCols = (cols, width) => {
    switch (width){
        case 'xs': // extra small
            return Math.max(cols - 5, 3.5)

        case 'sm': // small
            return Math.max(cols - 4, 4.5)
        
        case 'md': // medium
            return Math.max(cols - 3, 5.5)
        case 'lg': // large
            return Math.max(cols - 2, 6.5)
        // case 'xl': // xlarge
        //     return Math.max(cols, 7.5)
        default:
            break
    }

    return Math.max(cols, 6.5)
}

function SingleLineGridList(props) {
    // console.log('SingleLineGridList', props)

    const { 
        classes, 
        data,
        match: {
            url
        },
        cols,
        cellHeight,
        width
    } = props

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={_calcCols(cols, width)} cellHeight={_calcCellHeigh(cellHeight, width)}>
                {data.map(movie => (
                    
                    <GridListTile key={movie.MovieID}>
                        <div className={classes.divImage}>
                            <img className={classes.image} src={movie.Poster100x149} alt={movie.MovieName} onError={_onImageError}/>
                            <div className={classes.divActionIcon}>
                                <IconButton>
                                    <FavoriteBorderIcon color='secondary'/>
                                </IconButton>
                                
                                <IconButton onClick={() => _onInfoClicked(url, movie.MovieID)}>
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

SingleLineGridList.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
}

export default compose ( withStyles(styles), withWidth() )(SingleLineGridList)