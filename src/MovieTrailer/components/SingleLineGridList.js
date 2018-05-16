

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

import React, { Fragment } from 'react';
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
        flexWrap: 'nowrap',
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

function SingleLineGridList(props) {
    // console.log('SingleLineGridList', props)

    const { 
        classes, 
        data,
        match: {
            url
        }
    } = props

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={8.5} cellHeight={298}>
                {data.map(movie => (
                    
                    <GridListTile key={movie.MovieID}>
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
                ))}
            </GridList>
        </div>
    );
}

SingleLineGridList.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default withStyles(styles)(SingleLineGridList);