

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
import FavoriteIcon from '@material-ui/icons/Favorite'

import { listStyles as styles } from '../styles'

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
        cols,
        cellHeight,
        width,
        onInfoClicked = props.onInfoClicked || _onInfoClicked
    } = props

    return (
        <div className={classes.root}>
            <GridList className={classes.gridListNoWrap} cols={_calcCols(cols, width)} cellHeight={_calcCellHeigh(cellHeight, width)}>
                {data.map(movie => (
                    
                    <GridListTile key={movie.MovieID}>
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