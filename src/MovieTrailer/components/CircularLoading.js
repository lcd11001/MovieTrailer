import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
})

function CircularLoading(props) {
    const { classes } = props
    return (
        <div>
            <CircularProgress className={classes.progress} color='secondary' size={50} />
        </div>
    )
}

CircularLoading.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CircularLoading)