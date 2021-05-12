import { LinearProgress } from '@material-ui/core'
import { getCurrentUser, useConfig } from 'components'
import { GetListItems } from 'components/Api'
import { SnackbarProvider } from 'notistack'
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import { Test } from '../Test'
import { Logon } from './Logon/Logon'

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 5 } },
})

const isTest = false

export const AppContexts = () => {
	const [isLoading, setIsLoading] = useState(true)

	const prefetch = async () => {

		await queryClient.prefetchQuery('CurrentUser', () => getCurrentUser(), {
			staleTime: 'Infinity',
			cacheTime: 'Infinity',
		})

		setIsLoading(false)
	}

	useEffect(() => {
		prefetch()
		return () => {}
	}, [])

	if (isLoading) return <LinearProgress />

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
					<>
						<Logon />
					</>
				)}
			</QueryClientProvider>
		</SnackbarProvider>
	)
}
