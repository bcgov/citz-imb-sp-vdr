import React from 'react'
import { SnackbarProvider } from 'notistack'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'

import { Logon } from './Logon/Logon'
import { Test } from '../Test'

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
