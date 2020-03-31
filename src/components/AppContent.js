import 'react-tabs/style/react-tabs.css'
import React, { useState, useEffect, useContext } from 'react'
import TermsOfReference from './terms/TermsOfReference'
import VDRTabs from './tabs/VDRTabs'
import { setCookie, getCookie } from './utilities/cookies'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PageContext } from '../App'

/**
 * Shows terms of reference if not already agreed to
 * Shows main app if terms of reference agreed to
 */

export default function AppContent() {
	const [cookieName, setCookieName] = useState('TORAgreement')
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [modified, setModified] = useState('')
	const [cookieDays, setCookieDays] = useState(1)
	const [agree, setAgree] = useState(
		getCookie(cookieName + modified) ? true : false
	)
	const [loading, setLoading] = useState(true)

	const pageContext = useContext(PageContext)

	const handleAgree = () => {
		console.log(`handleAgree`)
        setCookie(cookieName + modified, 'true', cookieDays)
        console.log(getCookie(cookieName + modified))
		setAgree(getCookie(cookieName + modified) ? true : false)
	}

	const handleDisagree = () => {
		window.close()
		window.location = '/_layouts/signout.aspx'
	}

	useEffect(() => {
		axios
			.get(
				`${pageContext.webAbsoluteUrl}/_api/Web/Lists/getbytitle('Config')/items?$filter=Key eq 'TOR'&$select=TextValue,MultiTextValue,Modified,NumberValue`
			)
			.then(response => {
				setTitle(response.data.value[0].TextValue)
				setBody(response.data.value[0].MultiTextValue)
				setModified(response.data.value[0].Modified)
                setCookieDays(response.data.value[0].NumberValue)

                if(window.location.hostname === "localhost"){
                    setAgree(true)
                }
				setLoading(false)
			})
			.catch(error => {
				console.warn('Axios get', error)
			})
		return () => {}
	}, [])

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
