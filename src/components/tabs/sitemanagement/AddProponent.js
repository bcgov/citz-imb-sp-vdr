import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core"
/**
 * present add proponent dialog
 */
function AddProponent(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle id="form-dialog-title">Add a new Proponent</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="proponentName"
                    label="Proponent's Name"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleSave(document.getElementById("proponentName").value)} color="primary">
                    Save
              </Button>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
              </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddProponent
