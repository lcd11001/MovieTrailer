

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

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    divImage: {
        display: 'flex',
        justifyContent: 'center'
    },
    image: {
        maxHeight: '100%',
        width: 'auto'
    }
});

const _onImageError = (error) => {
    error.target.src = './defaultImage/unavailable.png'
}

function SingleLineGridList(props) {
    const { classes, data } = props;

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={8.5} cellHeight={300}>
                {data.map(movie => (
                    <GridListTile key={movie.MovieID}>
                        <img className={classes.image} src={movie.Poster100x149} alt={movie.MovieName} onError={_onImageError} width='100' height='149'/>
                        <GridListTileBar
                            title={movie.MovieName}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
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