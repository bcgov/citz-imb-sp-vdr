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
		console.log('getTOSCookieConfig')
		const cookieConfig = await GetTOSCookieConfig()

		setCookieName(cookieConfig.name)
		setCookieDays(cookieConfig.Days)
		setIsLoadingCookie(false)
	}

	const updateHasCookie = (newHasCookie) => {
		setHasCookie(newHasCookie)
	}

	useEffect(() => {
		console.log('TermsOfService')
		getTOSCookieConfig()
		return () => {}
	}, [])

	useEffect(() => {
		console.log('cookieName :>> ', cookieName)
		const cookie = getCookie(cookieName)

		console.log('cookie :>> ', cookie)
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
