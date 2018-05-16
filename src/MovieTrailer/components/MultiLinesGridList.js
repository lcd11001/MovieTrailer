

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

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
        fontSmoothing: 'antialiased'
    },
    subtitle: {
        color: theme.palette.primary.light,
        whiteSpace: 'nowrap',
        textShadow: `${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px, ${theme.palette.primary.dark} 0px 0px 1px`,
        fontSmoothing: 'antialiased'
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
});

const _onImageError = (error) => {
    error.target.src = './defaultImage/unavailable.png'
}

// const _onInfoClick = (movieID) => {
//     console.log('_onInfoClick', movieID)
// }

const _randomCellCols = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const _getAvailableCells = (arr, index, maxCells) => {
    var nextIndex = index
    while(arr[nextIndex] === 0 && nextIndex - index < maxCells){
        nextIndex ++
    }

    return nextIndex - index
}

const _markUnvailableCells = (arr, len, maxlen, index, cols, cellCols) => {
    // let newArr = [].concat(arr)
    
    for (var i=0; i<cellCols; i++) {
        for (var j=0; j<cellCols; j++) {
            let x = i + (index % len)
            let y = j + parseInt(index / len)
            let markIndex = x + y * cols
            // console.log('x', x, 'y', y, 'markIndex', markIndex)
            // if (markIndex >= len) {
            //     var appendArr = new Array(cols)
            //     appendArr.fill(0, 0, cols)
            //     console.log('   => old array', newArr)
            //     newArr = newArr.concat(appendArr)
            //     console.log('   => new array', newArr)
            //     len += cols
            // }
            // newArr[markIndex] = cellCols
            if (markIndex >= len) {
                len += cols
                if (len > maxlen) {
                    console.error('array not enough length ' + len + ' vs max length ' + maxlen)
                }
            }
            arr[markIndex] = cellCols
        }
    }
    // return {newarr: newArr, newlen: len}
    return len
}

const _getNextIndex = (arr, index, cellCols) => {
    var nextIndex = index + cellCols
    while (arr[nextIndex] !== 0) {
        nextIndex += arr[nextIndex]
    }
    return nextIndex
}

const _getRemainCellCols = (remainCellCols, cols, cellCols) => {
    remainCellCols -= cellCols
    if (remainCellCols == 0) {
        remainCellCols = cols
    }
    return remainCellCols
}

const MultiLinesGridList = (props) => {
    


        console.log('MultiLinesGridList', props)

        const { 
            classes, 
            data,
            match: {
                url
            },
            cols,
            cellHeight,
            maxCellCols = Math.min((props.maxCellCols || 1), props.cols)
        } = props

        let maxlen = data.length * maxCellCols * 2
        let arr = new Array(maxlen).fill(0)
        let len = cols
        let remainCellCols = cols
        let index = 0

        return (
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={cols} cellHeight={cellHeight}>
                    {data.map(movie => {
                        let availableCellsPerRow = _getAvailableCells(arr, index, Math.min(maxCellCols, remainCellCols))
                        console.log('availableCellsPerRow', availableCellsPerRow)

                        let cellCols = _randomCellCols(1, availableCellsPerRow)
                        console.log('cellCols', cellCols)

                        len = _markUnvailableCells(arr, len, maxlen, index, cols, cellCols)
                        console.log('_markUnvailableCells arr', arr, 'len', len)

                        index = _getNextIndex(arr, index, cellCols)
                        console.log('_getNextIndex', index)

                        remainCellCols = _getRemainCellCols(remainCellCols, cols, cellCols)
                        console.log('_getRemainCellCols', remainCellCols)

                        return (
                            <GridListTile key={movie.MovieID} cols={cellCols} rows={cellCols}>
                                <div className={classes.divImage}>
                                    <img className={classes.image} src={movie.Poster100x149} alt={movie.MovieName} onError={_onImageError}/>
                                    <div className={classes.divActionIcon}>
                                        <IconButton>
                                            <FavoriteBorderIcon color='secondary'/>
                                        </IconButton>
                                        
                                            <IconButton component={props => <Link {...props}/>} to={url !== '/' ? `${url}/movie/${movie.MovieID}` : `/movie/${movie.MovieID}`}>
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
        );
    
}

MultiLinesGridList.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    cols: PropTypes.number.isRequired,
    cellHeight: PropTypes.number.isRequired,
    maxCellCols: PropTypes.number
};

export default withStyles(styles)(MultiLinesGridList);