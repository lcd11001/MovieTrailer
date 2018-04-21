import React, { Fragment, Component } from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

export default class extends Component {
    state = {
        open: false
    }

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
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

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' variant='raised'>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
} 
    