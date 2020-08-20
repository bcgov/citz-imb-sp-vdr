import React, { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'

import {
	TermsOfServiceDialog,
	setCookie,
	GetTOSConfig,
	LogAction,
} from 'Components'

export const TermsOfService = ({
	loading,
	cookieName,
	cookieDays,
	updateHasCookie,
}) => {
	const [title, setTitle] = useState('title')
	const [body, setBody] = useState('body')

	const handleAgree = () => {
		setCookie(cookieName, 'true', cookieDays)
		updateHasCookie(cookieName)
		LogAction('agreed to TOS')
	}

	const handleDisagree = () => {
		LogAction('disagreed to TOS')
		window.close()
		window.location = '/_layouts/signout.aspx'
	}

	const getTOSConfig = async () => {
		const TOSConfig = await GetTOSConfig()
		setTitle(TOSConfig[0].TextValue)
		setBody(TOSConfig[0].MultiTextValue)
	}

	useEffect(() => {
		getTOSConfig()
		return () => {}
	}, [])

	return loading ? (
		<CircularProgress />
	) : (
		<TermsOfServiceDialog
			dialogTitle={title}
			dialogBody={body}
			handleAgree={handleAgree}
			handleDisagree={handleDisagree}
		/>
	)
}
