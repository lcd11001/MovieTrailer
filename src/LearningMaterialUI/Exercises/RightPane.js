import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Form from './Form'

export default ({ 
  styles, 
  exercise,
  editMode,
  onEdit,
  muscles 
}) => (
  <Paper style={styles.paper}>
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
            <Typography variant='subheading' style={{marginTop: 20}}>
                {exercise.description}
            </Typography>
        </Fragment>
      )
    }
    
  </Paper>
)
