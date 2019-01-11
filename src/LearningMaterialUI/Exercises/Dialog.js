import React, { Fragment, Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Form from './Form'
import { Fab } from '@material-ui/core';

export default class extends Component {
    state = {
        open: false
    }

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    _handleFormSubmit = (exercise) => {
        this._handleToggle()

        this.props.onCreate(exercise)
    }


    render() {
        const {categories, onCreate} = this.props
        return (
            <Fragment>
                <Fab 
                    color='secondary' 
                    size={'small'}
                    onClick={this._handleToggle}
                >
                    <AddIcon />
                </Fab>
                <Dialog
                    open={this.state.open}
                    onClose={this._handleToggle}
                    fullWidth
                    maxWidth={'sm'}
                >
                    <DialogTitle id='form-dialog-title'>
                        Create a new exercise
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below
                        </DialogContentText>
                        <Form 
                            muscles={categories}
                            onSubmit={this._handleFormSubmit}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
    