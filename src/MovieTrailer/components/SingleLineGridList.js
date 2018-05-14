

/**
 * data = [
 *      {
 *          CategoryID : "45,74,37,83,34,53,41,44",
 *          KnownAs: "Thủy Hử Nhí (Thuyết Minh)",
 *          MovieID: "13947",
 *          MovieName: "All Men Are Brothers Kids",
 *          Poster100x149: "http://t.hdviet.com/thumbs/100x149/961aaf0cb9824
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
        color: theme.palette.primary.light,
        whiteSpace: 'normal'
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    divImage: {
        height: '100%'
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'contain'
    },
    imageIcon: {
        zIndex: 1,
        paddingTop: 0,	
	    paddingRight: 0,
	    position: 'absolute',
	    right: 10,
	    top: 10,
	    display: 'block'
    }
});

const _onImageError = (error) => {
    error.target.src = './defaultImage/unavailable.png'
}

function SingleLineGridList(props) {
    const { classes, data } = props;

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={8.5} cellHeight={298}>
                {data.map(movie => (
                    
                    <GridListTile key={movie.MovieID}>
                        <div className={classes.divImage}>
                            <img className={classes.image} src={movie.Poster100x149} alt={movie.MovieName} onError={_onImageError}/>
                            <IconButton className={classes.imageIcon}>
                                <InfoIcon className={classes.title} />
                            </IconButton>
                        </div>
                        <GridListTileBar
                            subtitle={  
                                <Typography gutterBottom noWrap={false} paragraph={true}>
                                    {movie.MovieName}
                                </Typography>
                            }
                            classes={{
                                root: classes.titleBar,
                                subtitle: classes.title,
                                actionIcon: classes.actionIcon
                            }}
                            actionIcon={
                                <IconButton>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>    
                            }
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