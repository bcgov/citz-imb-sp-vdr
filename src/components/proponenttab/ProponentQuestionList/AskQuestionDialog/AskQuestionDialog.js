import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { SPDialog, AskQuestion } from 'Components'
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
	const [showAlert, setShowAlert] = useState(false)

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const saveAction = async () => {
		if (question.length > 0 && question.length < 256) {
			await AskQuestion(
				question,
				listName,
				enqueueSnackbar,
				proponentName,
				groupId
			)
			closeDialog()
		} else {
			setShowAlert(true)
		}
	}

	const cancelAction = () => {
		closeDialog()
	}

	return (
		<SPDialog
			open={open}
			title={'Ask Question'}
			saveButtonText='Submit'
			saveButtonAction={saveAction}
			cancelButtonAction={cancelAction}>
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
		</SPDialog>
	)
}
