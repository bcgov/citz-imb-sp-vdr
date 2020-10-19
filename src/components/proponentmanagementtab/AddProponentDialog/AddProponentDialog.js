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
import { MakeUniqueID, AddPermissionsToActivityLog } from 'Components'
import { CreateProponentGroup } from './CreateProponentGroup/CreateProponentGroup'
import { CreateProponentLibrary } from './CreateProponentLibrary/CreateProponentLibrary'
import { CreateProponentQuestionList } from './CreateProponentQuestionList/CreateProponentQuestionList'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'

const addProponent = async (
	proponentName,
	enqueueSnackbar,
	roles,
	closeDialog
) => {
	const uniqueId = MakeUniqueID()

	const currentUser = await GetCurrentUser({})
	const associatedGroups = await GetAssociatedGroups()

	const group = await CreateProponentGroup({
		groupName: uniqueId,
		associatedGroups: associatedGroups,
	})
	enqueueSnackbar('Created Proponent Group', {
		variant: 'success',
	})

	const proponentLibrary = await CreateProponentLibrary({
		listName: uniqueId,
		associatedGroups: associatedGroups,
		roles: roles,
		group: group,
		currentUser: currentUser.Id,
	})
	enqueueSnackbar('Created Proponent Library', {
		variant: 'success',
	})

	const proponentQuestionList = await CreateProponentQuestionList({
		listName: `${uniqueId}_Questions`,
		associatedGroups: associatedGroups,
		roles: roles,
		group: group,
		currentUser: currentUser.Id,
	})
	enqueueSnackbar('Created Proponent Question List', {
		variant: 'success',
	})

	let proponents = await AddItemsToList({
		listName: 'Proponents',
		items: {
			Title: proponentName,
			UUID: uniqueId,
			GroupId: group.Id,
		},
	})
	enqueueSnackbar('Added Proponent to Proponent List', {
		variant: 'success',
	})

	let sitePermissions = await AddPermissionsToSite({
		principalId: group.Id,
		roleDefId: roles['Read'].Id,
	})
	enqueueSnackbar('Granted Proponent Group access to site', {
		variant: 'success',
	})

	let ActivityLogPermissions = await AddPermissionsToActivityLog(group, roles)
	closeDialog()
}

export const AddProponentDialog = ({ open, closeDialog }) => {
	const [proponentName, setProponentName] = useState('')
	const [disableButtons, setDisableButtons] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const [showRoleAlert, setShowRoleAlert] = useState(false)
	const [roles, setRoles] = useState()

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const saveHandler = () => {
		if (proponentName.length > 0 && proponentName.length < 256) {
			setDisableButtons(true)
			addProponent(proponentName, enqueueSnackbar, roles, closeDialog)
		} else {
			setShowAlert(true)
		}
	}

	const cancelHandler = () => {
		closeDialog()
	}

	const getRoleDefinitions = async () => {
		const roleDefs = await GetRoleDefinitions({})

		if (roleDefs['Read with Add']) {
			setRoles(roleDefs)
		} else {
			setShowRoleAlert(true)
		}
	}

	useEffect(() => {
		getRoleDefinitions()
		return () => {}
	}, [])

	return (
		<Fragment>
			{showRoleAlert ? (
				<Alert severity='error'>
					Site Collection is missing the 'Read with Add' Permission
					Level, please contact your Site Collection Administrator
				</Alert>
			) : (
				<Dialog
					open={open}
					//onClose={cancelButtonAction}
					maxWidth={'md'}>
					<DialogTitle id='form-dialog-title'>
						Add Proponent
					</DialogTitle>
					<DialogContent>
						{showAlert ? (
							<Alert severity='error'>
								Proponent Name must be between 1 and 255
								characters
							</Alert>
						) : null}
						<TextField
							autoFocus
							margin='dense'
							id='proponentName'
							label="Proponent's Name"
							type='text'
							fullWidth
							onChange={(e) => {
								setProponentName(e.target.value)
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={saveHandler} disabled={disableButtons}>
							Submit
						</Button>
						<Button
							onClick={cancelHandler}
							disabled={disableButtons}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Fragment>
	)
}
