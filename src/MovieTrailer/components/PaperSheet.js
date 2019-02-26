import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
})

function PaperSheet(props) {
    const { classes, title, description } = props
    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <Typography variant="headline" component="h3">
                    {title}
                </Typography>
                <Typography component="p">
                    {description}
                </Typography>
            </Paper>
        </div>
    )
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default withStyles(styles)(PaperSheet)