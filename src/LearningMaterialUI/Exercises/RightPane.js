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
                            <Typography variant='h4'>
                                {exercise.title}
                            </Typography>
                            <Typography variant='subtitle1' style={{ marginTop: 20 }}>
                                {exercise.description}
                            </Typography>
                        </Fragment>
                    )
            }

        </Paper>
    )
