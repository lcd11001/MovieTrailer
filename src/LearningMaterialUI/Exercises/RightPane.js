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
            <Typography variant='h4' gutterBottom>
                {exercise.title}
            </Typography>
            {
                editMode
                    ? (
                        <Form
                            key={exercise.id}
                            muscles={muscles}
                            onSubmit={onEdit}
                            exercise={exercise}
                        />
                    ) : (


                        <Typography variant='subtitle1'>
                            {exercise.description}
                        </Typography>

                    )
            }

        </Paper>
    )
