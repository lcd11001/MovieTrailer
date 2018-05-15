import React from 'react'
import Grid from '@material-ui/core/Grid'
import LeftPane from './LeftPane'
import RightPane from './RightPane'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    paper: {
        padding: 20,
        marginTop: 5,
        height: 500,
        overflowY: 'auto'
    }
})

export default withStyles(styles)(
    ({ classes, exercises, muscles, category, onSelect, exercise, onDelete, onEditMode, editMode, onEdit }) => (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <LeftPane
                    className={classes.paper}
                    exercises={exercises}
                    category={category}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onEditMode={onEditMode}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
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
