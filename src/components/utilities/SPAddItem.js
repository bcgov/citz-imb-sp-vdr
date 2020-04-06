import React, { useState, useContext } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button
} from '@material-ui/core'

export const SPAddItem = ({ open, addItemCallback }) => {
	return (
		<Dialog open={open} onClose={addItemCallback}>
			<DialogTitle id='form-dialog-title'>
				Add a new Proponent
			</DialogTitle>
			<DialogContent>
				<TextField

				/>
			</DialogContent>
			<DialogActions>
				<Button >
					Save
				</Button>
				<Button >
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
