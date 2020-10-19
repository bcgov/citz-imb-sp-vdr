import React, { useState, useEffect, Fragment } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from '@material-ui/core'
import { AskQuestion } from 'Components'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'

export const AskQuestionDialog = ({
	open,
	closeDialog,
	listName,
	proponentName,
	groupId,
}) => {
	const [question, setQuestion] = useState('')
	const [disableButtons, setDisableButtons] = useState(false)
	const [showAlert, setShowAlert] = useState(false)

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const saveHandler = async () => {
		if (question.length > 0 && question.length < 256) {
			setDisableButtons(true)
            await AskQuestion(question, listName, enqueueSnackbar, proponentName, groupId)
            closeDialog()
		} else {
			setShowAlert(true)
		}
	}

	const cancelHandler = () => {
		closeDialog()
	}

	return (
		<Dialog
			open={open}
			//onClose={cancelButtonAction}
			maxWidth={'md'}>
			<DialogTitle id='form-dialog-title'>Ask Question</DialogTitle>
			<DialogContent>
				{showAlert ? (
					<Alert severity='error'>
						Question must be between 1 and 255 characters
					</Alert>
				) : null}
				<TextField
					autoFocus
					margin='dense'
					id='question'
					label='Question'
					type='text'
					fullWidth
					onChange={(e) => {
						setQuestion(e.target.value)
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={saveHandler} disabled={disableButtons}>
					Submit
				</Button>
				<Button onClick={cancelHandler} disabled={disableButtons}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
