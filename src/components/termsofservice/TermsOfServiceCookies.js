import React, { useEffect, useState } from 'react'

import {
	AppContent,
	GetTOSCookieConfig,
	getCookie,
	TermsOfService,
} from 'Components'

export const TermsOfServiceCookies = () => {
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
		<AppContent />
	) : (
		<TermsOfService
			loading={isLoading}
			cookieName={cookieName}
			cookieDays={cookieDays}
			updateHasCookie={updateHasCookie}
		/>
	)
}
