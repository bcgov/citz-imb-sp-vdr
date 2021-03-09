import React from 'react'
import { SnackbarProvider } from 'notistack'
// import { LinearProgress } from '@material-ui/core'
// import { useConfig, useProponents } from 'components'
// import { useConfig } from 'components'

import { Logon } from './Logon/Logon'
import { Test } from '../Test'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'

// export const ConfigContext = React.createContext()
// export const PublicQuestionsContext = React.createContext()
// export const ProponentsContext = React.createContext()

const queryClient = new QueryClient()

const isTest = false

export const AppContexts = () => {
	return (
		<SnackbarProvider
			dense
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}>
			<QueryClientProvider client={queryClient}>
				{isTest ? (
					<>
						<Test />
						<ReactQueryDevtoolsPanel />
					</>
				) : (
					<Logon />
				)}
			</QueryClientProvider>
		</SnackbarProvider>
	)
}
