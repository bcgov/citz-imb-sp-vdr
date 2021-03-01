import React, { useState, useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { LinearProgress } from '@material-ui/core'
import { useConfig, useList, useProponents } from 'Components'
import { Logon } from './Logon/Logon'
import { Test } from '../Test'

import { QueryClientProvider, QueryClient } from 'react-query'

export const ConfigContext = React.createContext()
export const PublicQuestionsContext = React.createContext()
export const ProponentsContext = React.createContext()

const queryClient = new QueryClient()

export const AppContexts = () => {
	const [isLoading, setIsLoading] = useState(true)

	const configList = useConfig()
	const publicQuestions = useList('Questions')
	const proponents = useProponents()

	useEffect(() => {
		if (!configList.isLoading) setIsLoading(false)
		return () => {}
	}, [configList])

	return isLoading ? (
		<LinearProgress />
	) : (
		<SnackbarProvider
			dense
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}>
			<QueryClientProvider client={queryClient}>
					<ConfigContext.Provider value={configList}>
						<PublicQuestionsContext.Provider
							value={publicQuestions}>
							<ProponentsContext.Provider value={proponents}>
								<Logon />
								{/* <Test /> */}
							</ProponentsContext.Provider>
						</PublicQuestionsContext.Provider>
					</ConfigContext.Provider>
			</QueryClientProvider>
		</SnackbarProvider>
	)
}
