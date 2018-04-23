import React, { Fragment, Component } from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = theme => ({
    FormControl: {
        width: 500
    }
})

export default withStyles(styles)( class extends Component {
    state = {
        open: false,
        exercise: {
            title: '',
            description: '',
            muscles: ''
        }
    }

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    _handleTextChange = name => event => {
        this.setState({
            exercise: {
                ...this.state.exercise,
                [name]: event.target.value
            }  
        })
    }

    _handleSelectChange = event => {
        this.setState({
            exercise: {
                ...this.state.exercise,
                [event.target.name]: event.target.value
            }  
        }) 
    }

    _handleSubmit = () => {
        this.props.onCreate({
            ...this.state.exercise,
            id: this.state.exercise.title.toLocaleLowerCase().replace(/ /g, '-')
        })

        this.setState({
            exercise: {
                title: '',
                description: '',
                muscles: ''
            },
            open: false
        })
    }

    render() {
        const {classes, categories} = this.props
        return (
            <Fragment>
                <Button 
                    variant='fab' 
                    color='secondary' 
                    mini
                    onClick={this._handleToggle}
                >
                    <AddIcon />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this._handleToggle}
                >
                    <DialogTitle id='form-dialog-title'>
                        Create a new exercise
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below
                        </DialogContentText>
                        <form>
                            <TextField
                                id='title'
                                label='Title'
                                value={this.state.exercise.title}
                                onChange={this._handleTextChange('title')}
                                margin='normal'
                                className={classes.FormControl}
                            />
                            <br />
                            <FormControl className={classes.FormControl}>
                                <InputLabel htmlFor='muscles'>Muscles</InputLabel>
                                <Select
                                    name='muscles'
                                    value={this.state.exercise.muscles}
                                    onChange={this._handleSelectChange}
                                >
                                    {
                                        categories.map((category, index) => 
                                            <MenuItem key={index} value={category}>
                                                <Typography
                                                    variant='caption'
                                                    style={{textTransform: 'capitalize'}}
                                                >
                                                    {category}
                                                </Typography>
                                            </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                            <br />
                            <TextField
                                id='description'
                                label='Description'
                                value={this.state.exercise.description}
                                onChange={this._handleTextChange('description')}
                                margin='normal'
                                multiline
                                rows='4'
                                className={classes.FormControl}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            color='primary' 
                            variant='raised'
                            onClick={this._handleSubmit}
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
})
    