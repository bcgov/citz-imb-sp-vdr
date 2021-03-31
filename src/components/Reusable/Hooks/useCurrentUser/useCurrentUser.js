import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

export const useCurrentUser = () => {
	const queryClient = useQueryClient();

	const query = queryClient.getQueryData('CurrentUser');

	const currentUser = useMemo(() => {
		if (query === undefined) return [];
		return query;
	}, [query]);

	return currentUser;
};
