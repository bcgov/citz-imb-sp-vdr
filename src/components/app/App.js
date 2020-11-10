import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { deviceDetect } from 'react-device-detect'
import { SnackbarProvider } from 'notistack'
import { useLogAction, TermsOfService } from 'Components'

import { Test } from './Test'

import './App.css'

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

	const LogAction = useLogAction()

	const device = deviceDetect()

	LogAction(
		`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`
	)

	return (
		<MuiThemeProvider theme={theme}>
			<SnackbarProvider
				dense
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}>
				{/* <TermsOfService /> */}
				<Test />
			</SnackbarProvider>
		</MuiThemeProvider>
	)
}
