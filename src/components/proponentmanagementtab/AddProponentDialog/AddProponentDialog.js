import React, { useState, useEffect, useContext, Fragment } from 'react'
import { TextField } from '@material-ui/core'
import { GetRoleDefinitions } from 'citz-imb-sp-utilities'
import { SPDialog } from 'Components'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'
import { addProponent } from './addProponent'

export const AddProponentDialog = ({ open, closeDialog }) => {
	const [proponentName, setProponentName] = useState('')
	const [showValidationAlert, setValidationShowAlert] = useState(false)
	const [showRoleAlert, setShowRoleAlert] = useState(false)
	const [roles, setRoles] = useState()

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const saveAction = async () => {
		if (proponentName.length > 0 && proponentName.length < 256) {
			await addProponent(
				proponentName,
				enqueueSnackbar,
				roles,
				closeDialog
			)
			closeDialog()
		} else {
			setValidationShowAlert(true)
		}
	}

	const cancelAction = () => {
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
				<SPDialog
					open={open}
					title={'Add Proponent'}
					saveButtonAction={saveAction}
					cancelButtonAction={cancelAction}>
					{showValidationAlert ? (
						<Alert severity='error'>
							Proponent Name must be between 1 and 255 characters
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
				</SPDialog>
			)}
		</Fragment>
	)
}
