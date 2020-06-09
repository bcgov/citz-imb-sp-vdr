import React, { useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Appcontent from './components/AppContent'
//import { GetContextWebInformation, GetCurrentUser } from 'citz-imb-sp-utilities'
import './css/App.css'

// export const WebFullUrl = React.createContext()
// export const CurrentUser = React.createContext()

export default function App() {
	//let webFullUrl, currentUser

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
		// GetContextWebInformation().then(response => {
		//     webFullUrl = response.WebFullUrl
		// })

		// GetCurrentUser().then(response => {
		//     currentUser = response
		// })

		return () => {}
	}, [])

	return (
		<MuiThemeProvider theme={theme}>
			<Appcontent />
		</MuiThemeProvider>
	)
}
