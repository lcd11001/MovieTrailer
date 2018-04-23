import React from 'react'
import Grid from 'material-ui/Grid'
import LeftPane from './LeftPane'
import RightPane from './RightPane'

const styles = {
  paper: {
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 500,
    overflowY: 'auto'
  }
}

export default ({ exercises, muscles, category, onSelect, exercise, onDelete, onEditMode, editMode, onEdit }) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      <LeftPane
        styles={styles}
        exercises={exercises}
        category={category}
        onSelect={onSelect}
        onDelete={onDelete}
        onEditMode={onEditMode}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <RightPane
        styles={styles}
        exercise={exercise}
        editMode={editMode}
        onEdit={onEdit}
        muscles={muscles}
      />
    </Grid>
  </Grid>
)
