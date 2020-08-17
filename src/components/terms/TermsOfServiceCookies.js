import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Button,
} from '@material-ui/core'

import { AppContent, GetTOSCookie, setCookie, getCookie } from 'Components'

export const TermsOfServiceCookies = () => {
	const [hasCookie, setHasCookie] = useState(false)
	const [myCookie, setMyCookie] = useState()

	useEffect(() => {
		const x = async () => {
			const response = await GetTOSCookie()
			console.log('response :>> ', response);
			return response
		}

		console.log('x :>> ', x());
		setMyCookie()

		// if (myCookie) {
		// 	if (getCookie(myCookie.name)) {
		// 		setHasCookie(true)
		// 	} else {
		// 		setHasCookie(false)
		// 	}
		// setIsLoading(false)
		// }
		return () => {}
	}, [])

	return hasCookie ? (
		<AppContent />
	) : (
		`TermsOfService has no Cookie Agreement ${myCookie}`
	)

	// const dialogTitle = 'title'
	// const dialogBody = 'body'
	// const response = getTermsOfService()

	// console.log('response :>> ', response)

	// const handleAgree = () => {
	// 	setCookie(myCookie.name, 'true', myCookie.days)
	// 	setHasCookie(true)
	// 	LogAction('agreed to TOS')
	// }

	// const handleDisagree = () => {
	// 	LogAction('disagreed to TOS')
	// 	window.close()
	// 	window.location = '/_layouts/signout.aspx'
	// }

	// return (
	// 	<Dialog
	// 		open={true}
	// 		scroll={'paper'}
	// 		disableBackdropClick={true}
	// 		disableEscapeKeyDown={true}
	// 		aria-labelledby='tor-dialog-title'
	// 		aria-describedby='tor-dialog-description'>
	// 		<DialogTitle id='tor-dialog-title'>{dialogTitle}</DialogTitle>
	// 		<DialogContent dividers={true}>
	// 			<div dangerouslySetInnerHTML={{ __html: dialogBody }} />
	// 		</DialogContent>

	// 		<DialogActions>
	// 			<Button
	// 				onClick={handleAgree}
	// 				color='primary'
	// 				variant='contained'>
	// 				Agree
	// 			</Button>
	// 			<Button
	// 				onClick={handleDisagree}
	// 				color='primary'
	// 				variant='outlined'>
	// 				Disagree
	// 			</Button>
	// 		</DialogActions>
	// 	</Dialog>
	// )
}
