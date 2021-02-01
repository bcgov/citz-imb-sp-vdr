import React, { useState, useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { LinearProgress } from '@material-ui/core'
import { useCurrentUser, useConfig, useList } from 'Components'
import { Logon } from './Logon/Logon'
import { Test } from '../Test'

export const UserContext = React.createContext()
export const ConfigContext = React.createContext()
export const PublicQuestionsContext = React.createContext()

export const AppContexts = () => {
	const [isLoading, setIsLoading] = useState(true)

	const currentUser = useCurrentUser()
	const configList = useConfig()
	const publicQuestions = useList('Questions')

	useEffect(() => {
		if (currentUser && !configList.isLoading) setIsLoading(false)
		return () => {}
	}, [currentUser, configList])

	return isLoading ? (
		<LinearProgress />
	) : (
		<SnackbarProvider
			dense
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}>
			<UserContext.Provider value={currentUser}>
				<ConfigContext.Provider value={configList}>
					<PublicQuestionsContext.Provider value={publicQuestions}>
						<Logon />
						{/* <Test /> */}
					</PublicQuestionsContext.Provider>
				</ConfigContext.Provider>
			</UserContext.Provider>
		</SnackbarProvider>
	)
}
