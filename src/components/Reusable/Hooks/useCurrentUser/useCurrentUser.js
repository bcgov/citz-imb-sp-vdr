import { useQuery } from 'react-query'
import { getCurrentUser } from './getCurrentUser/getCurrentUser'

export const useCurrentUser = () => {
	const currentUserQueryName = 'currentUser'

	const currentUser = useQuery(currentUserQueryName, () => getCurrentUser())

	return {...currentUser.data, isLoading: currentUser.isLoading}
}
