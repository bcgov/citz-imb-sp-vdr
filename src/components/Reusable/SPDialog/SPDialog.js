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
		saveButtonAction = (event) => {},
		cancelButtonText = 'Cancel',
		cancelButtonAction = (event) => {},
		...otherProps
	} = props

	const [disableButtons, setDisableButtons] = useState(false)

	const saveHandler = async (event) => {
		setDisableButtons(true)
		await saveButtonAction(event)
		setDisableButtons(false)
	}
	const cancelHandler = (event) => {
		cancelButtonAction(event)
	}

	return (
		<Dialog
			open={open}
			onClose={cancelButtonAction}
			fullWidth={true}
			maxWidth={'md'}
			{...otherProps}>
			<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions>
				{showSave ? (
					<Button
						onClick={saveHandler}
						disabled={disableButtons}
						variant={'contained'}>
						{saveButtonText}
					</Button>
				) : null}
				<Button
					onClick={cancelHandler}
					disabled={disableButtons}
					variant={'contained'}>
					{cancelButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
