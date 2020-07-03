import 'react-tabs/style/react-tabs.css'
import React, { useState, useEffect } from 'react'
import TermsOfReference from './terms/TermsOfReference'
import { VDRTabs } from './tabs/VDRTabs'
import { setCookie, getCookie } from './utilities/cookies'
import { GetListItems } from 'citz-imb-sp-utilities'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function AppContent() {
	const [isLoading, setIsLoading] = useState(true)
	const [hasCookie, setHasCookie] = useState(false)
	const [myCookie, setMyCookie] = useState()
	const [isHome, setIsHome] = useState(false)

	const handleAgree = () => {
		setCookie(myCookie.name, 'true', myCookie.days)
		setHasCookie(true)
	}

	const handleDisagree = () => {
		window.close()
		window.location = '/_layouts/signout.aspx'
	}

	useEffect(() => {
		if (
			window.location.pathname.split('/').pop().toLowerCase() ===
			'home.aspx'
		) {
			setIsHome(true)
		}

		GetListItems({ listName: 'Config', filter: `Key eq 'TOS'` }).then(
			(response) => {
				setMyCookie({
					name: `${response[0].Key}-${response[0].Modified}`,
					days: response[0].NumberValue,
				})
			}
		)

		return () => {}
	}, [])

	useEffect(() => {
		if (myCookie) {
			if (getCookie(myCookie.name)) {
				setHasCookie(true)
				setIsLoading(false)
			} else {
				setHasCookie(false)
				setIsLoading(false)
			}
		}
		return () => {}
	}, [myCookie])

	return isLoading ? (
		<CircularProgress />
	) : hasCookie ? (
		isHome ? (
			<VDRTabs />
		) : (
			''
		)
	) : (
		<TermsOfReference
			handleAgree={handleAgree}
			handleDisagree={handleDisagree}
		/>
	)
}
