import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@material-ui/core'
import { ProponentManagementTab } from 'Components'

export const Test = ({children}) => {
	return <Dialog open={true}>
	<DialogTitle id='form-dialog-title'>Manage Users</DialogTitle>
	<DialogContent>
		{children}
	</DialogContent>
	<DialogActions>

	</DialogActions>
</Dialog>
}
