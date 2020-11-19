import React, { useState, useEffect } from 'react'
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
	useLogAction,
	SendAddUserConfirmationEmail,
	DialogOptionsContext,
	GroupTable,
	FormikDialog,
} from 'Components'

export const ProponentGroupDialog = ({ open, close }) => {
	const dialogContent = <GroupTable groupName={'Dev Site Visitors'} addRecord={true}

	/>

	return (
		<FormikDialog
			open={open}
			close={close}
			title={'Manage Group'}

			dialogContent={dialogContent}
		/>
	)
}
