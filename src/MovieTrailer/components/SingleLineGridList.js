

/**
 * data = [
 *      {
 *          CategoryName: "Hành động",
 *          Cover: "http://t.hdviet.com/backdrops/origins/bf4601ed955c4482e58dce7dbbccb227.jpg",
 *          KnownAs: "Ám Ảnh Xác Sống (Phần 4)",
 *          MovieID: "13877",
 *          MovieName: "Fear The Walking Dead (Season 4)",
 *          Movielink: "http://movies.hdviet.com/fear-the-walking-dead-season-4_13877.html",
 *          Slug: "phim-am-anh-xac-song-phan-4-fear-the-walking-dead-season-4.html"
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
});

function SingleLineGridList(props) {
    const { classes, data } = props;

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {data.map(movie => (
                    <GridListTile key={movie.MovieID}>
                        <img src={movie.Cover} alt={movie.MovieName} />
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