import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getCurrentUser } from './getCurrentUser/getCurrentUser'

export const useCurrentUser = () => {
	const currentUserQueryName = 'currentUser'

	const currentUser = useQuery(currentUserQueryName, () => getCurrentUser())
	console.log('currentUser :>> ', currentUser)

	return {...currentUser.data, isLoading: currentUser.isLoading}
}
