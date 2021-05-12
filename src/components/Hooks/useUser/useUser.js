import { GetUser } from 'components/Api';
import { useQuery } from 'react-query';

export const useUser = (userId) => {
	const userQueryName = ['user', userId];

	const user = useQuery(userQueryName, () => GetUser(userId));

	return { ...user.data, isLoading: user.isLoading };
};
