import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Form from './Form'

export default ({
    className,
    exercise,
    editMode,
    onEdit,
    muscles
}) => (
        <Paper className={className}>
            {
                editMode
                    ? (
                        <Form
                            muscles={muscles}
                            onSubmit={onEdit}
                            exercise={exercise}
                        />
                    ) : (
                        <Fragment>
                            <Typography variant='display1'>
                                {exercise.title}
                            </Typography>
                            <Typography variant='subheading' style={{ marginTop: 20 }}>
                                {exercise.description}
                            </Typography>
                        </Fragment>
                    )
            }

        </Paper>
    )
