import { useQuery } from 'react-query';
import { GetUser } from 'components/ApiCalls';

export const useUser = (userId) => {
	const userQueryName = ['user', userId];

	const user = useQuery(userQueryName, () => GetUser({ userId }));

	return { ...user.data, isLoading: user.isLoading };
};
