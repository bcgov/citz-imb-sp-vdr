import React, { useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { deviceDetect } from 'react-device-detect'

import './App.css'
import { LogAction, TermsOfService } from 'Components'

export const App = () => {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#234075',
			},
			secondary: {
				main: '#E3A82B',
			},
		},
	})

	useEffect(() => {
		const device = deviceDetect()
		LogAction(
			`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`
		)
		return () => {}
	}, [])

	return (
		<MuiThemeProvider theme={theme}>
			<TermsOfService />
		</MuiThemeProvider>
	)
}
