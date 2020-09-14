import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
	Home,
	GetTOSCookieConfig,
	getCookie,
	TermsOfServiceDialog,
} from 'Components'

export const TermsOfService = ({ handleLoading }) => {
	const [isLoadingCookie, setIsLoadingCookie] = useState(true)
	const [hasCookie, setHasCookie] = useState(false)

	const [cookieName, setCookieName] = useState()
	const [cookieDays, setCookieDays] = useState()

	const getTOSCookieConfig = async () => {
		const cookieConfig = await GetTOSCookieConfig()

		setCookieName(cookieConfig.name)
		setCookieDays(cookieConfig.Days)
		setIsLoadingCookie(false)
	}

	const updateHasCookie = (newHasCookie) => {
		setHasCookie(newHasCookie)
	}

	useEffect(() => {
		getTOSCookieConfig()
		return () => {}
	}, [])

	useEffect(() => {
		const cookie = getCookie(cookieName)

		return () => {}
	}, [cookieName])

	return isLoadingCookie ? (
		<CircularProgress />
	) : hasCookie ? (
		<Home />
	) : (
		<TermsOfServiceDialog
			dialogTitle='title'
			dialogBody='body'
			handleAgree
			handleDisagree
			cookieName={cookieName}
			cookieDays={cookieDays}
			updateHasCookie={updateHasCookie}
		/>
	)
}
