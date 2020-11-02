import React from 'react'
import { SPDialog,useLogAction, ToggleProponent } from 'Components'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'

export const ToggleProponentDialog = ({
	open,
	closeDialog,
	active,
	proponentName,
	groupId,
	proponentItemId,
	proponentId,
}) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const saveAction = async () => {
		await ToggleProponent(
			active,
			groupId,
			proponentItemId,
			proponentId,
			enqueueSnackbar
		)
		useLogAction(`set ${proponentName} to ${active ? 'inactive' : 'active'}`)
		enqueueSnackbar(
			`set ${proponentName} to ${active ? 'inactive' : 'active'}`,
			{
				variant: 'warning',
			}
		)
		closeDialog()
	}

	const cancelAction = () => {
		closeDialog()
	}

	return (
		<SPDialog
			open={open}
			title={`Toggle ${proponentName}`}
			saveButtonText={active ? 'Set Inactive' : 'Set Active'}
			saveButtonAction={saveAction}
			cancelButtonAction={cancelAction}>
				{active ? (
					<Alert severity='error'>
						Proponent Group will be deleted; member users will
						no-longer be able to access the site.
					</Alert>
				) : (
					<Alert severity='info'>
						A new group will be created for the proponent. You will
						need to manually add users.
					</Alert>
				)}
		</SPDialog>
	)
}
