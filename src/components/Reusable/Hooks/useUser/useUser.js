import { useQuery } from 'react-query'
import { GetUser } from 'citz-imb-sp-utilities'

export const useUser = (userId) => {
	const userQueryName = ['user', userId]

	const user = useQuery(userQueryName, () => GetUser({ userId }))

	return { ...user.data, isLoading: user.isLoading }
}
