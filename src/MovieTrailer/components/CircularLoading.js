import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    }

});

const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function CircularLoading(props) {
    const { classes } = props;
    return (
        <div style={divStyle}>
            {/* <CircularProgress className={classes.progress} /> */}
            <CircularProgress className={classes.progress} size={50} />
            {/* <CircularProgress className={classes.progress} color="secondary" /> */}
            {/* <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} /> */}
        </div>
    );
}

CircularLoading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularLoading);