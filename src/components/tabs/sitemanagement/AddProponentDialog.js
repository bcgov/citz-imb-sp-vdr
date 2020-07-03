import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from '@material-ui/core'

import makeUUID from '../../utilities/makeUUID.js'
import AddProponent from './AddProponent'

// let SP = window.SP
// let ExecuteOrDelayUntilScriptLoaded = window.ExecuteOrDelayUntilScriptLoaded
// toast.configure({
//     position: "bottom-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: false
// })

export const AddProponentDialog = ({
	open,
	listName,
	handleClose,
}) => {
	const [name, setName] = useState('')
	const uniqueId = makeUUID()

	const handleSave = () => {
		// validate
		if (!name) return

	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle id='form-dialog-title'>
				Add a new Proponent
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='proponentName'
					label="Proponent's Name"
					type='text'
					fullWidth
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSave} color='primary'>
					Save
				</Button>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
