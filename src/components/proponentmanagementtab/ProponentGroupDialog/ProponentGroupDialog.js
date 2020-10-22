import React, { useContext } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'
import {
	SPDialog,
	SPGroup,
	LogAction,
	SendAddUserConfirmationEmail,
	DialogOptionsContext,
} from 'Components'

export const ProponentGroupDialog = ({
	open,
	closeDialog,
	groupId,
	proponentName,
}) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const saveHandler = () => {
		enqueueSnackbar('')
	}
	const cancelAction = () => {
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
		<SPDialog
			open={open}
			title={`Manage Users for ${proponentName}`}
			showSave={false}
			cancelButtonAction={cancelAction}
			fullScreen={true}
			>
			<SPGroup
				groupId={groupId}
				addUsersCallback={addUserCallback}
				removeUserCallback={removeUserCallback}
				editGroup={false}
			/>
		</SPDialog>
	)
}
