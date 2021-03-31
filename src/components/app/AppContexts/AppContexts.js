import React, { useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtoolsPanel } from 'react-query/devtools';
import { GetListItems } from 'components/ApiCalls';
import { getCurrentUser } from 'components';
import { Logon } from './Logon/Logon';
import { Test } from '../Test';
import { LinearProgress } from '@material-ui/core';

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 5 } },
});

const isTest = true;

export const AppContexts = () => {
	const [isLoading, setIsLoading] = useState(true);

	const prefetch = async () => {
		await queryClient.prefetchQuery(
			'config',
			() => GetListItems({ listName: 'Config' }),
			{
				staleTime: 'Infinity',
				cacheTime: 'Infinity',
			}
		);

		await queryClient.prefetchQuery('CurrentUser', () => getCurrentUser(), {
			staleTime: 'Infinity',
			cacheTime: 'Infinity',
		});

		setIsLoading(false);
	};

	useEffect(() => {
		prefetch();
		return () => {};
	}, []);

	if (isLoading) return <LinearProgress />;

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
	);
};
