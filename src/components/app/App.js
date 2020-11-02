import React, { useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { deviceDetect } from 'react-device-detect'
import { SnackbarProvider } from 'notistack'

import { Test } from './Test'

import './App.css'
import { useLogAction, TermsOfService } from 'Components'

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
	const device = deviceDetect()
	useLogAction(
		`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`
	)

	useEffect(() => {



		return () => {}
	}, [])

	return (
		<MuiThemeProvider theme={theme}>
				<SnackbarProvider
					dense
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}>
					<TermsOfService />
					{/* <Test /> */}
				</SnackbarProvider>
		</MuiThemeProvider>
	)
}
