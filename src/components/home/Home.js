import React, { useState, useEffect } from 'react'

import { AppTabs } from './AppTabs/AppTabs'

export const Home = () => {
	const [isHome, setIsHome] = useState(false)

	useEffect(() => {
		if (
			window.location.pathname.split('/').pop().toLowerCase() ===
			'home.aspx'
		) {
			setIsHome(true)
		}

		return () => {}
	}, [])

	if(!isHome) return null

	return <AppTabs />
}
