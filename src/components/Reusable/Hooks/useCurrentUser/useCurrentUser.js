import { useQueryClient } from 'react-query';

export const useCurrentUser = () => {
	const queryClient = useQueryClient();

	return queryClient.getQueryData('CurrentUser');
};
