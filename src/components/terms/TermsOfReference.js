import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
} from '@material-ui/core'
import { GetListItems } from 'citz-imb-sp-utilities'

export const TermsOfReference = ({ handleAgree, handleDisagree }) => {
	const [body, setBody] = useState()
	const [title, setTitle] = useState()

	useEffect(() => {
		GetListItems({ listName: 'Config', filter: `Key eq 'TOS'` }).then(
			(response) => {
				setTitle(response[0].TextValue)
				setBody(response[0].MultiTextValue)
			}
		)
		return () => {}
	}, [])

	return (
		<Dialog
			open={true}
			scroll={'paper'}
			disableBackdropClick={true}
			disableEscapeKeyDown={true}
			aria-labelledby='tor-dialog-title'
			aria-describedby='tor-dialog-description'>
			<DialogTitle id='tor-dialog-title'>{title}</DialogTitle>
			<DialogContent dividers={true}>
				<div dangerouslySetInnerHTML={{ __html: body }} />
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
