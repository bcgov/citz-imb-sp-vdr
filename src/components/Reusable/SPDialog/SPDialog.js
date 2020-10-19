import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

export const SPDialog = ({
	open,
	title,
	content = 'content',
	showSave = true,
	saveButtonText = 'Save',
	saveButtonAction = () => {
		console.warn('default save action')
	},
	cancelButtonText = 'Cancel',
	cancelButtonAction = () => {
		console.warn('default cancel action')
	},
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [disableButtons, setDisableButtons] = useState(false)

	const saveHandler = () => {
		setDisableButtons(true)
		saveButtonAction()
	}
	const cancelHandler = () => {
		cancelButtonAction()
	}

	return (
		<Dialog
			open={open}
			onClose={cancelButtonAction}
			fullWidth={true}
			maxWidth={'lg'}>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			{isLoading ? (
				<DialogActions>
					<CircularProgress />
				</DialogActions>
			) : (
				<DialogActions>
					<Button onClick={saveHandler} disabled={disableButtons}>
						{saveButtonText}
					</Button>
					<Button onClick={cancelHandler} disabled={disableButtons}>
						{cancelButtonText}
					</Button>
				</DialogActions>
			)}
		</Dialog>
	)
}
