

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

import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'

import { store } from '../redux/store'
import { push, replace } from 'react-router-redux'

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
        width: '100%',
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
        fontSize: '1.2rem',
        // extra small
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.4rem'
        },
        // small
        [theme.breakpoints.only('sm')]: {
            fontSize: '0.6rem'
        },
        // medium
        [theme.breakpoints.only('md')]: {
            fontSize: '0.8rem'
        },
        // large
        [theme.breakpoints.only('lg')]: {
            fontSize: '1.0rem'
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
    error.target.src = '/defaultImage/unavailable.png'
}

const _onInfoClicked = (movieID) => {
    let url = '/movie/' + movieID
    store.dispatch(push(url))
}

const _randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const _getAvailableCells = (cellCols, maxCols) => {
    return Math.min(maxCols, cellCols)
}

const _getNextIndex = (index, cellCols) => {
    var nextIndex = index + cellCols
    return nextIndex
}

const _getRemainCellCols = (remainCellCols, cols, cellCols) => {
    remainCellCols -= cellCols
    if (remainCellCols === 0) {
        remainCellCols = cols
    }
    return remainCellCols
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
            return Math.max(cols - 4, 2)

        case 'sm': // small
            return Math.max(cols - 3, 3)
        
        case 'md': // medium
            return Math.max(cols - 2, 4)
        case 'lg': // large
            return Math.max(cols - 1, 5)
        // case 'xl': // xlarge
        //     return Math.max(cols, 6)
        default:
            break
    }

    return Math.max(cols, 6)
}

const MultiLinesGridList = (props) => {
    // console.log('MultiLinesGridList', props)
    const { 
        classes, 
        data,
        cols,
        cellHeight,
        maxCellCols = Math.min((props.maxCellCols || 1), props.cols),
        maxCellRows = props.maxCellRows || 1,
        width
    } = props

    let remainCellCols = cols
    let index = 0
    let cellRows = maxCellRows
    let cellCols = maxCellCols

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={_calcCols(cols, width)} cellHeight={_calcCellHeigh(cellHeight, width)}>
                {data.map(movie => {
                    if (maxCellCols !== 1) {
                        let availableCellsPerRow = _getAvailableCells(maxCellCols, remainCellCols)
                        // console.log('availableCellsPerRow', availableCellsPerRow)

                        if (remainCellCols === cols) {
                            cellRows = _randomInRange(1, maxCellRows)
                            // console.log('==cellRows==', cellRows)
                        }

                        cellCols = _randomInRange(1, availableCellsPerRow)
                        // console.log('cellCols', cellCols)

                        index = _getNextIndex(index, cellCols)
                        // console.log('_getNextIndex', index)

                        remainCellCols = _getRemainCellCols(remainCellCols, cols, cellCols)
                        // console.log('_getRemainCellCols', remainCellCols)
                    }
                    
                    return (
                        <GridListTile key={movie.MovieID} cols={cellCols} rows={cellRows}>
                            <div className={classes.divImage}>
                                <img className={classes.image} src={movie.Poster100x149} alt={movie.MovieName} onError={_onImageError}/>
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
                        )
                    })
                }
            </GridList>
        </div>
    )
    
}

MultiLinesGridList.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    maxCellCols: PropTypes.number,
    maxCellRows: PropTypes.number
}

export default compose ( withStyles(styles), withWidth() )(MultiLinesGridList)