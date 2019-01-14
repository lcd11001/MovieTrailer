import React from 'react'
import Grid from '@material-ui/core/Grid'
import LeftPane from './LeftPane'
import RightPane from './RightPane'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 3,
        overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginTop: 5,
            height: 'calc(100% - 10px)', // margin top-bottom
        },
        [theme.breakpoints.down('xs')]: {
            height: '100%',
        }
    }, 
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    }, 
    container: {
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px - 48px)' // header & footer bar
        },
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100% - 56px - 48px)' // header & footer bar
        }
    },
    item: {
        [theme.breakpoints.down('xs')]: {
            height: '50%'
        }
    }
})

export default withStyles(styles)(
    ({ classes, exercises, muscles, category, onSelect, exercise, onDelete, onEditMode, editMode, onEdit }) => (
        <Grid container className={classes.container}>
            <Grid item className={classes.item} xs={12} sm={6}>
                <LeftPane
                    className={classes.paper}
                    exercises={exercises}
                    category={category}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onEditMode={onEditMode}
                />
            </Grid>
            <Grid item className={classes.item} xs={12} sm={6}>
                <RightPane
                    className={classes.paper}
                    exercise={exercise}
                    editMode={editMode}
                    onEdit={onEdit}
                    muscles={muscles}
                />
            </Grid>
        </Grid>
    )
)
