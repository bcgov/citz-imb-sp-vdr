import React from 'react'
import './css/App.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { AppContent } from './components/AppContent'

export default function App() {
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
			<AppContent />
		</MuiThemeProvider>
	)
}
