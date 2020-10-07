import React, { useState, useEffect } from 'react'
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
} from '@material-ui/core'
import { GetTermsOfService, setCookie, LogAction, FormatText } from 'Components'

export const TermsOfServiceDialog = ({
	cookieName,
	cookieDays,
	updateHasCookie,
}) => {
	const [title, setTitle] = useState()
	const [body, setBody] = useState()
	const [isLoading, setIsLoading] = useState(true)

	const handleAgree = () => {
		setCookie(cookieName, 'true', cookieDays)
		updateHasCookie(true)
		LogAction('agreed to TOS')
	}

	const handleDisagree = () => {
		LogAction('disagreed to TOS')
		window.close()
		window.location = '/_layouts/signout.aspx'
	}

	const getTermsOfService = async () => {
		const terms = await GetTermsOfService()

		setTitle(terms[0].TextValue)
		setBody(FormatText(terms[0].MultiTextValue))
		setIsLoading(false)
	}

	useEffect(() => {
		getTermsOfService()
		return () => {}
	}, [])

	return isLoading ? (
		''
	) : (
		<Dialog
			open={true}
			scroll={'paper'}
			disableBackdropClick={true}
			disableEscapeKeyDown={true}
			aria-labelledby='tor-dialog-title'
			aria-describedby='tor-dialog-description'>
			<DialogTitle id='tor-dialog-title'>{title}</DialogTitle>
			<DialogContent dividers={true}>
				<div dangerouslySetInnerHTML={{__html:body}} />
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
