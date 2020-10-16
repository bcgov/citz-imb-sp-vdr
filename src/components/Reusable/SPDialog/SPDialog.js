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

	const saveHandler = () => {
		setIsLoading(true)
		saveButtonAction()
	}
	const cancelHandler = () => {
		cancelButtonAction()
	}

	return (
		<Dialog open={open} onClose={cancelButtonAction} fullWidth={true} maxWidth={'lg'}>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			{isLoading ? (
				<DialogActions>
					<CircularProgress />
				</DialogActions>
			) : (
				<DialogActions>
					{showSave ? (
						<Button onClick={saveHandler}>{saveButtonText}</Button>
					) : (
						''
					)}
					<Button onClick={cancelHandler}>{cancelButtonText}</Button>
				</DialogActions>
			)}
		</Dialog>
	)
}
