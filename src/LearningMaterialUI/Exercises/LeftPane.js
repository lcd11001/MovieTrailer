import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export default ({ 
    className, 
    exercises, 
    category, 
    onSelect, 
    onDelete, 
    onEditMode 
}) => (
    <Paper className={className}>
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
                            variant='h5'
                            style={{ textTransform: 'capitalize' }}
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
                                                <IconButton onClick={() => onEditMode(currentValue.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => onDelete(currentValue.id)} color='secondary'>
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
