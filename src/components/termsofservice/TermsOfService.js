import React, { useEffect, useState } from 'react'

import {
	Home,
	GetTOSCookieConfig,
	getCookie,
	TermsOfServiceDialog,
} from 'Components'

export const TermsOfService = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [hasCookie, setHasCookie] = useState()
	const [cookieName, setCookieName] = useState()
	const [cookieDays, setCookieDays] = useState()

	useEffect(() => {
		GetTOSCookieConfig().then((cookieConfig) => {
			setCookieName(cookieConfig.name)
			setCookieDays(cookieConfig.Days)
			setIsLoading(false)
		})

		return () => {}
	}, [])

	useEffect(() => {
		setHasCookie(getCookie(cookieName))
		return () => {}
	}, [cookieName])

	const updateHasCookie = (cookieName) => {
		setHasCookie(cookieName)
	}

	return hasCookie ? (
		<Home />
	) : (
		<TermsOfServiceDialog
			dialogTitle='title'
			dialogBody='body'
			handleAgree
			handleDisagree
			loading={isLoading}
			cookieName={cookieName}
			cookieDays={cookieDays}
			updateHasCookie={updateHasCookie}
		/>
	)
}
