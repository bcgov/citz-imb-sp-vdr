import React, { useState, useEffect } from 'react'
import { SnackbarProvider } from 'notistack'
import { LinearProgress } from '@material-ui/core'
import { useConfig, useProponents } from 'components'

import { Logon } from './Logon/Logon'
import { Test } from '../Test'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'

export const ConfigContext = React.createContext()
export const PublicQuestionsContext = React.createContext()
export const ProponentsContext = React.createContext()

const queryClient = new QueryClient()

const isTest = true

export const AppContexts = () => {
	const [isLoading, setIsLoading] = useState(true)

	const configList = useConfig()

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
					<ProponentsContext.Provider value={proponents}>
						{isTest ? (
							<>
								<Test />
								<ReactQueryDevtoolsPanel />
							</>
						) : (
							<Logon />
						)}
					</ProponentsContext.Provider>
				</ConfigContext.Provider>
			</QueryClientProvider>
		</SnackbarProvider>
	)
}
