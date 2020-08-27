import React, { useState, useEffect } from 'react'

import { AppTabs } from 'Components'

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

	return isHome ? <AppTabs /> : ''
}
