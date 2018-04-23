import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const styles = theme => ({
    FormControl: {
        width: 350
    }
})


export default withStyles(styles)(class extends Component {
    state = this.getInitState()

    getInitState() {
        const { exercise } = this.props

        return exercise ? exercise : {
            title: '',
            description: '',
            muscles: ''
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         ...nextProps.exercise
    //     })
    // }
    static getDerivedStateFromProps(nextProps, prevState) {
        return nextProps.exercise || null
    }

    _handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    _handleSelectChange = event => {
        console.log('_handleSelectChange '+ event.target.name + '=' + event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        }) 
    }

    _handleSubmit = () => {
        this.props.onSubmit({
            id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
            ...this.state,
        })

        this.setState(this.getInitState())
    }

    render() {
        const {classes, muscles, exercise} = this.props
        return (
            <form>
                <TextField
                    id='title'
                    label='Title'
                    value={this.state.title}
                    onChange={this._handleTextChange('title')}
                    margin='normal'
                    className={classes.FormControl}
                />
                <br />
                <FormControl className={classes.FormControl}>
                    <InputLabel htmlFor='muscles'>Muscles</InputLabel>
                    <Select
                        name='muscles'
                        value={this.state.muscles}
                        onChange={this._handleSelectChange}
                    >
                        {
                            muscles.map((muscle, index) => 
                                <MenuItem key={index} value={muscle}>
                                    <Typography
                                        variant='body1'
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {muscle}
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
                    value={this.state.description}
                    onChange={this._handleTextChange('description')}
                    margin='normal'
                    multiline
                    rows='4'
                    className={classes.FormControl}
                />
                <br />
                <Button 
                    color='primary' 
                    variant='raised'
                    onClick={this._handleSubmit}
                >
                    {
                        exercise ? 'Edit':'Create'
                    }
                </Button>
            </form>
        )
    }
})