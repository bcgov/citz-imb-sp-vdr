import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'

export const SPDialog = ({
	open,
	title,
	content = 'content',
	showSave = true,
	saveButtonText = 'Save',
	saveButtonAction = () => {console.log('default save action')},
	cancelButtonText = 'Cancel',
	cancelButtonAction = () => {console.log('default cancel action')},
}) => {
	return (
		<Dialog open={open} onClose={cancelButtonAction}>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			<DialogActions>
			{showSave ? (<Button onClick={saveButtonAction}>{saveButtonText}</Button>) : ('')}
				<Button onClick={cancelButtonAction}>{cancelButtonText}</Button>
			</DialogActions>
		</Dialog>
	)
}
