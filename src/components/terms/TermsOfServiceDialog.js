import React from 'react'

import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
} from '@material-ui/core'

export const TermsOfServiceDialog = ({
	dialogTitle,
	dialogBody,
	handleAgree,
	handleDisagree,
}) => {
	return (
		<Dialog
			open={true}
			scroll={'paper'}
			disableBackdropClick={true}
			disableEscapeKeyDown={true}
			aria-labelledby='tor-dialog-title'
			aria-describedby='tor-dialog-description'>
			<DialogTitle id='tor-dialog-title'>{dialogTitle}</DialogTitle>
			<DialogContent dividers={true}>
				<div dangerouslySetInnerHTML={{ __html: dialogBody }} />
			</DialogContent>

			<DialogActions>
				<Button
					onClick={handleAgree}
					color='primary'
					variant='contained'>
					Agree
				</Button>
				<Button
					onClick={handleDisagree}
					color='primary'
					variant='outlined'>
					Disagree
				</Button>
			</DialogActions>
		</Dialog>
	)
}
