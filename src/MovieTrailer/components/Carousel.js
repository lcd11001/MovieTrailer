

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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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

const _onInfoClicked = (baseUrl, movieID) => {
    let url = baseUrl !== '/' 
        ? baseUrl + '/movie/' + movieID 
        : '/movie/' + movieID

    store.dispatch(push(url))
}

function Carousel(props) {
    console.log('Carousel', props)
    const { 
        classes, 
        data, 
        match: { 
            url 
        } 
    } = props;

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5} cellHeight={423}>
                {data.map(movie => (
                    <GridListTile key={movie.MovieID}>
                        <div className={classes.divImage}>
                            <img className={classes.image} src={movie.Cover} alt={movie.MovieName} onError={_onImageError} />
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
                                <Typography className={classes.title} variant='headline'>
                                    {movie.KnownAs}
                                </Typography>
                            }
                            subtitle={
                                <Typography className={classes.subtitle} variant='headline'>
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

Carousel.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default withStyles(styles)(Carousel);