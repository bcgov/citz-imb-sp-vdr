import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { AppContexts } from './AppContexts/AppContexts'
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

	return (
		<MuiThemeProvider theme={theme}>
			<AppContexts />
		</MuiThemeProvider>
	)
}
