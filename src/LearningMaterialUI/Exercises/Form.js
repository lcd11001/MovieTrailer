import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import compose from 'recompose/compose'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'

// https://material-ui-next.com/layout/css-in-js/
const styles = theme => ({
    // xl - extra large
    FormControl: {
        width: 900
    },
    // extra small
    [theme.breakpoints.only('xs')]: {
        FormControl: {
            width: 275
        }
    },
    // small
    [theme.breakpoints.only('sm')]: {
        FormControl: {
            width: 300
        }
    },
    // medium
    [theme.breakpoints.only('md')]: {
        FormControl: {
            width: 475
        }
    },
    // large
    [theme.breakpoints.only('lg')]: {
        FormControl: {
            width: 650
        }
    }
})


export default compose (withStyles(styles), withWidth())(class extends Component {
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
        const {classes, width, muscles, exercise} = this.props
        console.log('Form width', width, classes)

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