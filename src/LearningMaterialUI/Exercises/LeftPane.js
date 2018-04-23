import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

export default ( { styles, exercises, category, onSelect, onDelete } ) => (
  <Paper style={styles.paper}>
    {
      exercises.map((currentValue, index) => {
        // console.log(currentValue)
        let [id, exercises] = currentValue
        // console.log(id, exercises)
        if (category && category !== id) {
          return null
        }

        return (
          <Fragment key={id}>
            <Typography
              variant='headline'
              style={{textTransform: 'capitalize'}}
            >
              {id}
            </Typography>
            <List component="nav">
              {
                exercises.map((currentValue, index) => {
                  return (
                    <ListItem 
                      button 
                      key={currentValue.id}
                      onClick={() => onSelect(currentValue.id)}
                    >
                      <ListItemText primary={currentValue.title} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => onDelete(currentValue.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })
              }
            </List>
          </Fragment>
        )
      })
    }
  </Paper>
)
