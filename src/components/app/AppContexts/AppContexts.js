import React from 'react';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtoolsPanel } from 'react-query/devtools';
import { GetListItems } from 'components/ApiCalls';

import { Logon } from './Logon/Logon';
import { Test } from '../Test';
import { LinearProgress } from '@material-ui/core';

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 5 } },
});

const isTest = false;

export const AppContexts = () => {
	queryClient.prefetchQuery(
		'config',
		() => GetListItems({ listName: 'Config' }),
		{
			staleTime: 'Infinity',
			cacheTime: 'Infinity',
		}
	);

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
	);
};
