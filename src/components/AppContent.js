import React, { useState, useEffect } from 'react'
import 'react-tabs/style/react-tabs.css'
import { GetListItems } from 'citz-imb-sp-utilities'

import {
	TermsOfService,
	VDRTabs,
	setCookie,
	getCookie,
	LogAction,
} from 'Components'

export const AppContent = () => {
	const [isHome, setIsHome] = useState(false)
	const [hasCookie, setHasCookie] = useState(false)

	useEffect(() => {
		if (
			window.location.pathname.split('/').pop().toLowerCase() ===
			'home.aspx'
		) {
			setIsHome(true)
		}

		

		return () => {}
	}, [])

	// useEffect(() => {
	// 	//
	// 	return () => {}
	// }, [myCookie])

	// return hasCookie ? (
	// 	<Home />
	// ) : (
	// 	<TermsOfService />
	// )

	return isHome ? <VDRTabs /> : ''
}
