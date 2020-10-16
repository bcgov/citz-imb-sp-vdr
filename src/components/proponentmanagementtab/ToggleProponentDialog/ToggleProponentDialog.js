import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from '@material-ui/core'
import { LogAction, ToggleProponent } from 'Components'
import { useSnackbar } from 'notistack'
import { Alert } from '@material-ui/lab'

export const ToggleProponentDialog = ({ open, closeDialog, active, proponentName, groupId, proponentItemId, proponentId }) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const saveHandler = async () => {
        await ToggleProponent(active, groupId, proponentItemId, proponentId, enqueueSnackbar)
        LogAction(
            `set ${proponentName} to ${
                active ? 'inactive' : 'active'
            }`
        )
        enqueueSnackbar(
            `set ${proponentName} to ${
                active ? 'inactive' : 'active'
            }`,
            {
                variant: 'warning',
            }
        )
        closeDialog()
	}

	const cancelHandler = () => {
		closeDialog()
	}

	return (
		<Dialog
			open={open}
			//onClose={cancelButtonAction}
			maxWidth={'md'}>
			<DialogTitle id='form-dialog-title'>Toggle {proponentName}</DialogTitle>
			<DialogContent>
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
			</DialogContent>
			<DialogActions>
				<Button onClick={saveHandler} >
					{active ? 'Set Inactive' : 'Set Active'}
				</Button>
				<Button onClick={cancelHandler} >
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}
