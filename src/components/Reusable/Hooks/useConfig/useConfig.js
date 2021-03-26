import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

export const useConfig = () => {
	const queryClient = useQueryClient();

	const query = queryClient.getQueryData('config');

	const config = useMemo(() => {
		if (query === undefined) return [];
		return query;
	}, [query]);

	return config;
};
