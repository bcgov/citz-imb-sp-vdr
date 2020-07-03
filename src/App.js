import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Appcontent from './components/AppContent'
import './css/App.css'

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
			<Appcontent />
		</MuiThemeProvider>
	)
}
