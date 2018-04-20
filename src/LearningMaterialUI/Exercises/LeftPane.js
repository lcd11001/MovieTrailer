import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemText } from 'material-ui/List'

export default ( { styles, exercises } ) => (
  <Paper style={styles.paper}>
    {
      exercises.map((currentValue, index) => {
        // console.log(currentValue)
        let [id, exercises] = currentValue
        // console.log(id, exercises)

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
                    <ListItem button key={currentValue.id}>
                      <ListItemText primary={currentValue.title} />
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
