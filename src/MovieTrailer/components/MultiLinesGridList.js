

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

import createStore from '../redux/store'
import { push } from 'react-router-redux'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import withStyles from '@material-ui/core/styles/withStyles'

import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import InfoIcon from '@material-ui/icons/Info'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { listStyles as styles } from '../styles'

import { getImage, posterSizes } from '../api'

const { store } = createStore()

const _onImageError = (error) => {
    error.target.src = '/defaultImage/unavailable.png'
}

const _onInfoClicked = (movieID, mediaType = 'movie') => {
    let url = `/${mediaType}/` + movieID
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

const _calcCellHeigh = (cellHeight, width) =>
{
    let height = cellHeight
    switch (width) {
        case 'xs': // extra small
            height = parseInt(cellHeight * 0.4, 10)
            break
        
        case 'sm': // small
            height = parseInt(cellHeight * 0.55, 10)
            break

        case 'md': // medium
            height = parseInt(cellHeight * 0.7, 10)
            break
        
        case 'lg': // large
            height = parseInt(cellHeight * 0.85, 10)
            break
        
        // case 'xl': // xlarge
        //     height = parseInt(cellHeight, 10)
        //     break

        default:
            break
    }
    
    // TheMovieDB API, default poster ratio is 2:3
    return parseInt(height * 3 / 2, 10)
}

const _calcCols = (cols, width) => {
    switch (width) {
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
    const {
        classes,
        data,
        cols,
        cellHeight,
        maxCellCols = Math.min((props.maxCellCols || 1), props.cols),
        maxCellRows = props.maxCellRows || 1,
        width,
        onInfoClicked = _onInfoClicked
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

                        if (remainCellCols === cols) {
                            cellRows = _randomInRange(1, maxCellRows)
                        }

                        cellCols = _randomInRange(1, availableCellsPerRow)

                        index = _getNextIndex(index, cellCols)

                        remainCellCols = _getRemainCellCols(remainCellCols, cols, cellCols)
                    }

                    return (
                        <GridListTile key={movie.id /*movie.MovieID*/} cols={cellCols} rows={cellRows} onClick={() => { onInfoClicked(movie.id /*movie.MovieID*/, movie.media_type) }}>
                            <div className={classes.divImage}>
                                <img className={classes.image} src={getImage(movie.poster_path, posterSizes.w500)/*getImage(movie.Poster100x149)*/} alt={movie.title /*movie.MovieName*/} onError={_onImageError} />
                                <div className={classes.divActionIcon}>
                                    <IconButton>
                                        <FavoriteBorderIcon color='secondary' />
                                    </IconButton>

                                    <IconButton onClick={() => onInfoClicked(movie.id /*movie.MovieID*/, movie.media_type)}>
                                        <InfoIcon color='primary' />
                                    </IconButton>
                                </div>
                            </div>
                            <GridListTileBar
                                title={
                                    <Typography className={classes.title}>
                                        {/* {movie.KnownAs} */}
                                        { movie.title || movie.name }
                                    </Typography>
                                }
                                subtitle={
                                    <Typography className={classes.subtitle}>
                                        {/* {movie.MovieName || movie.Name} */}
                                        {movie.vote_average.toFixed(1)} / 10
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
    maxCellRows: PropTypes.number,
    onInfoClicked: PropTypes.func
}

export default compose(withStyles(styles), withWidth())(MultiLinesGridList)