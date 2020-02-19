import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, Paper, DialogActions, Button, DialogContentText } from "@material-ui/core"

export default function DisableProponent(props) {
    console.log(props)
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle id="form-dialog-title">Disable {props.proponentName}?</DialogTitle>
            <DialogContentText>
                <Paper>
                    <h3>This action will</h3>
                    <ul>
                        <li>set {props.proponentName} to be disabled</li>
                        <li>remove access for all user accounts associated with {props.proponentName}</li>
                        <li>set the {props.proponent} library to read-only</li>
                        <li>set the {props.proponent}_Questions list to read-only</li>
                    </ul>
                </Paper>
            </DialogContentText>
            <DialogActions>
                <Button onClick={props.handleDisable} color="primary">
                    Disable
              </Button>
                <Button onClick={props.close} color="primary">
                    Cancel
              </Button>
            </DialogActions>
        </Dialog>
    )
}