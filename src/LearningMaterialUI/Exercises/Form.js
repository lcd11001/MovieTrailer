import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default class extends Component {
    state = this.getInitState()

    getInitState() {
        const { exercise } = this.props

        return exercise ? exercise : {
            title: '',
            description: '',
            muscles: ''
        }
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
    }

    render() {
        const {muscles, exercise} = this.props
        return (
            <form>
                <TextField
                    id='title'
                    label='Title'
                    value={this.state.title}
                    onChange={this._handleTextChange('title')}
                    margin='normal'
                    fullWidth
                />
                <br />
                <FormControl fullWidth>
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
                    fullWidth
                />
                <br />
                <Button 
                    color='primary' 
                    variant='contained'
                    onClick={this._handleSubmit}
                    disabled={!this.state.title || !this.state.muscles}
                >
                    {
                        exercise ? 'Edit':'Create'
                    }
                </Button>
            </form>
        )
    }
}