import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { SPGroup, LogAction, SendAddUserConfirmationEmail } from 'Components'

export const AddUserDialog = ({
	open,
	closeDialog,
	groupId,
	proponentName,
}) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const saveHandler = () => {
		enqueueSnackbar('')
	}
	const cancelHandler = () => {
		closeDialog()
	}

	const addUserCallback = (users) => {
		for (let i = 0; i < users.length; i++) {
			enqueueSnackbar(
				`added ${users[i].Title} to ${proponentName} group`,
				{ variant: 'success' }
			)
			LogAction(`added ${users[i].Title} to ${proponentName} group`)
			SendAddUserConfirmationEmail(users, proponentName)
		}
	}

	const removeUserCallback = (response) => {
		enqueueSnackbar(
			`removed ${response.Title} from ${proponentName} group`,
			{ variant: 'warning' }
		)
		LogAction(`added ${response.Title} to ${proponentName} group`)
	}

	return (
		<Dialog
			open={open}
			maxWidth={'md'}>
			<DialogTitle id='form-dialog-title'>Manage Users</DialogTitle>
			<DialogContent>
				<SPGroup
					groupId={groupId}
					addUsersCallback={addUserCallback}
					removeUserCallback={removeUserCallback}
					editGroup={false}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={cancelHandler}>Close</Button>
			</DialogActions>
		</Dialog>
	)
}
