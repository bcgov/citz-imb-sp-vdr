import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core"
/**
 * present add proponent dialog
 */
export class AddProponent extends Component {
    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
                <DialogTitle id="form-dialog-title">Add a new Proponent</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Proponent's Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleSave("fred")} color="primary">
                        Save
              </Button>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
              </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddProponent
