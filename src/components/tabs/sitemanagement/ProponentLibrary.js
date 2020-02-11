import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core"

export default function ProponentLibrary() {
    return (
        <Dialog open={this.props.open} onClose={this.props.handleClose}>
            <DialogTitle id="form-dialog-title">Disable {this.props.proponentName}?</DialogTitle>
            <DialogActions>
                <Button onClick={this.props.handleDisable} color="primary">
                    Disable
              </Button>
                <Button onClick={this.props.handleClose} color="primary">
                    Cancel
              </Button>
            </DialogActions>
        </Dialog>
    )
}