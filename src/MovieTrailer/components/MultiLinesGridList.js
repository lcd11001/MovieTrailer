

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

import React from 'react'
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

import InfoIcon from '@material-ui/icons/Info'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { listStyles as styles } from '../styles'

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
            return parseInt(cellHeight * 0.4, 10)

        case 'sm': // small
            return parseInt(cellHeight * 0.55, 10)
        
        case 'md': // medium
            return parseInt(cellHeight * 0.7, 10)
        case 'lg': // large
            return parseInt(cellHeight * 0.85, 10)
        // case 'xl': // xlarge
        //     return parseInt(cellHeight, 10)
        default:
            break
    }

    return parseInt(cellHeight, 10)
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
        width,
        onInfoClicked = props.onInfoClicked || _onInfoClicked
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
                                    
                                    <IconButton onClick={() => onInfoClicked(movie.MovieID)}>
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
                                        {movie.MovieName || movie.Name}
                                    </Typography>
                                }
                                classes={{
                                    root: classes.titleBar,
                                    titleWrap: classes.titleWrap
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