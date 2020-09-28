import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
	Home,
	GetTOSCookieConfig,
	getCookie,
	TermsOfServiceDialog,
} from 'Components'

export const TermsOfService = () => {
	const [isLoadingCookie, setIsLoadingCookie] = useState(true)
	const [hasCookie, setHasCookie] = useState(false)

	const [cookieName, setCookieName] = useState()
	const [cookieDays, setCookieDays] = useState()

	const getTOSCookieConfig = async () => {
		const cookieConfig = await GetTOSCookieConfig()
		setCookieName(cookieConfig.name)
		setCookieDays(cookieConfig.Days)

		const cookie = getCookie(cookieConfig.name)
		updateHasCookie(cookie)
		setIsLoadingCookie(false)
	}

	const updateHasCookie = (newHasCookie) => {
		setHasCookie(newHasCookie)
	}

	useEffect(() => {
		if (isLoadingCookie) {
			getTOSCookieConfig()
		}
		return () => {}
	}, [isLoadingCookie])

	return isLoadingCookie ? (
		<CircularProgress />
	) : hasCookie ? (
		<Home />
	) : (
		<TermsOfServiceDialog
			dialogTitle='title'
			dialogBody='body'
			cookieName={cookieName}
			cookieDays={cookieDays}
			updateHasCookie={updateHasCookie}
		/>
	)
}
