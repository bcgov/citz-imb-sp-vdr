import React, { useState, useEffect, Fragment } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from '@material-ui/core'
import {
	GetRoleDefinitions,
	AddPermissionsToSite,
	GetAssociatedGroups,
	AddItemsToList,
	GetCurrentUser,
} from 'citz-imb-sp-utilities'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'
import { SPGroup, LogAction } from 'Components'

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

	const addUserCallback = (response) => {
		for (let i = 0; i < response.length; i++) {
			enqueueSnackbar(
				`added ${response[i].Title} to ${proponentName} group`,
				{ variant: 'success' }
			)
			LogAction(`added ${response[i].Title} to ${proponentName} group`)
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
			//onClose={cancelButtonAction}
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
