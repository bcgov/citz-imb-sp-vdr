import 'react-tabs/style/react-tabs.css'
import React, { useState, useEffect } from 'react'
import TermsOfReference from './terms/TermsOfReference'
import { VDRTabs } from './tabs/VDRTabs'
import { setCookie, getCookie } from './utilities/cookies'
import { GetListItems } from 'citz-imb-sp-utilities'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function AppContent() {
	const key = 'TOS'

	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [cookieDays, setCookieDays] = useState(1)
	const [cookieName, setCookieName] = useState('')
	const [agree, setAgree] = useState()
	const [loading, setLoading] = useState(true)

	const handleAgree = () => {
		setCookie(cookieName, 'true', cookieDays)
		setAgree(true)
	}

	const handleDisagree = () => {
		window.close()
		window.location = '/_layouts/signout.aspx'
	}

	useEffect(() => {
		if (loading) {
			GetListItems({ listName: 'Config', filter: `Key eq '${key}'` })
				.then((response) => {
					setTitle(response[0].TextValue)
					setBody(response[0].MultiTextValue)
					setCookieDays(response[0].NumberValue)
					setCookieName(key + response[0].Modified)
					setAgree(getCookie(key + response[0].Modified))
					setLoading(false)
				})
				.catch((error) => {
					console.log(`error getting TOS`, error)
				})
		}
		return () => {}
	}, [loading])

	return loading ? (
		<CircularProgress />
	) : agree ? (
		<VDRTabs />
	) : (
		<TermsOfReference
			title={title}
			body={body}
			handleAgree={handleAgree}
			handleDisagree={handleDisagree}
		/>
	)
}
