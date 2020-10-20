import React, { useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { deviceDetect } from 'react-device-detect'
import { SnackbarProvider } from 'notistack'

import { Test } from './Test'

import './App.css'
import {
	LogAction,
	TermsOfService,
	TableOptionsContext,
	DialogOptionsContext,
} from 'Components'

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

	const tableOptions = {
		search: false,
		sorting: false,
		paging: false,
		pageSize: 20,
		draggable: false,
		actionsColumnIndex: -1,
	}

	const dialogOptions = {
		maxWidth: 'xs',
		fullScreen: true
	}

	useEffect(() => {
		const device = deviceDetect()
		LogAction(
			`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`
		)
		return () => {}
	}, [])

	return (
		<TableOptionsContext.Provider value={tableOptions}>
			<DialogOptionsContext.Provider value={dialogOptions}>
				<MuiThemeProvider theme={theme}>
					<SnackbarProvider
						dense
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}>
						<TermsOfService />
						{/* <Test>Fred</Test> */}
					</SnackbarProvider>
				</MuiThemeProvider>
			</DialogOptionsContext.Provider>
		</TableOptionsContext.Provider>
	)
}
