import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'

export const SPDialog = (props) => {
	const {
		open,
		title,
		children,
		showSave = true,
		saveButtonText = 'Save',
		saveButtonAction = () => {
			console.warn('default save action')
		},
		cancelButtonText = 'Cancel',
		cancelButtonAction = () => {
			console.warn('default cancel action')
		},
		...otherProps
	 } = props

	const [disableButtons, setDisableButtons] = useState(false)

	const saveHandler = async () => {
		setDisableButtons(true)
		await saveButtonAction()
		setDisableButtons(false)
	}
	const cancelHandler = () => {
		cancelButtonAction()
	}

	return (
		<Dialog
			open={open}
			onClose={cancelButtonAction}
			fullWidth={true}
			maxWidth={'md'}
			{...otherProps}
			>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				{showSave ? (
					<Button onClick={saveHandler} disabled={disableButtons}>
						{saveButtonText}
					</Button>
				) : null}
				<Button onClick={cancelHandler} disabled={disableButtons}>
					{cancelButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
