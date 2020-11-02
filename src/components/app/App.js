import React, { useState, useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { deviceDetect } from 'react-device-detect'
import { SnackbarProvider } from 'notistack'
import {
	GetCurrentUser,
	AddItemsToList,
	GetListItems,
} from 'citz-imb-sp-utilities'



import { Test } from './Test'

import './App.css'
import { LogAction, TermsOfService, TableOptionsContext } from 'Components'

export const App = () => {
	const [currentUser, setCurrentUser] = useState({})

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

	const getCurrentUser = async () => {
		try {
			const user = await GetCurrentUser({ expand: 'Groups' })
			const proponents = await GetListItems({ listName: 'Proponents' })

			let proponent = ''

			for (let i = 0; i < proponents.length; i++) {
				for (let j = 0; j < user.Groups.results.length; j++) {
					if (proponents[i].GroupId === user.Groups.results[j].Id) {
						proponent = proponents[i].UUID
						break
					}
				}
			}
			setCurrentUser({
				name: user.Title,
				id: user.Id,
				email: user.Email,
				proponent: proponent,
			})
		} catch (err) {
			console.error('error getting current user :>> ', err)
		}
	}

	useEffect(() => {
		getCurrentUser()

		return () => {}
	}, [])

	useEffect(() => {
		const device = deviceDetect()

		LogAction(
			`logged in using ${device.browserName} ${device.browserMajorVersion} and ${device.osName} ${device.osVersion}`
		)
		return () => {}
	}, [currentUser])

	return (
		<MuiThemeProvider theme={theme}>
			<UserContext.Provider value={currentUser}>
				<SnackbarProvider
					dense
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}>
					<TermsOfService />
					{/* <Test /> */}
				</SnackbarProvider>
			</UserContext.Provider>
		</MuiThemeProvider>
	)
}
