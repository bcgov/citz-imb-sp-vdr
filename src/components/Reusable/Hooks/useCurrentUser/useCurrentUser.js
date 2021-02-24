import { useState, useEffect } from 'react'
import {
	GetCurrentUser,
	GetListItems,
	GetAssociatedGroups,
} from 'citz-imb-sp-utilities'

import { useList } from 'Components'

import { useQuery, useQueryClient } from 'react-query'

export const useCurrentUser = () => {
	// const [currentUser, setCurrentUser] = useState()

	const currentUser = useQuery('currentUser', () =>
		GetCurrentUser({ expand: 'Groups' })
	)
	// console.log('currentUser :>> ', currentUser)

	const proponents = useList({listName: 'Proponents'})
	// console.log('proponents :>> ', proponents)

	const associatedGroups = useQuery('associatedGroups', () =>
		GetAssociatedGroups()
	)
	// console.log('associatedGroups :>> ', associatedGroups);

	const getCurrentUser = async () => {
		try {
			const user = await GetCurrentUser({ expand: 'Groups' })

			const proponents = await GetListItems({ listName: 'Proponents' })
			let proponent = 'not a proponent'
			for (let i = 0; i < proponents.length; i++) {
				for (let j = 0; j < user.Groups.results.length; j++) {
					if (proponents[i].GroupId === user.Groups.results[j].Id) {
						proponent = proponents[i].UUID
						break
					}
				}
			}

			const assocGroups = await GetAssociatedGroups()

			// setCurrentUser({
			// 	name: user.Title,
			// 	id: user.Id,
			// 	email: user.Email,
			// 	proponent: proponent,
			// 	isOwner: isOwner,
			// })
		} catch (err) {
			console.error('error getting current user :>> ', err)
		}
	}
	// const queryClient = useQueryClient()

	const getUserProponent = () => {
		let proponent = 'not a proponent'
		for (let i = 0; i < proponents.items.length; i++) {
			for (let j = 0; j < currentUser.data.Groups.results.length; j++) {
				if (
					proponents.items[i].GroupId ===
					currentUser.data.Groups.results[j].Id
				) {
					proponent = proponents.items[i].UUID
					break
				}
			}
		}
		return proponent
	}

	const getIsOwner = () => {
		let isOwner = false
		for (let i = 0; i < currentUser.data.Groups.results.length; i++) {
			if (
				currentUser.data.Groups.results[i].Id ===
				associatedGroups.data.AssociatedOwnerGroup.Id
			) {
				isOwner = true
				break
			}
		}
		return isOwner
	}

	if (currentUser.isLoading || proponents.isLoading || associatedGroups.isLoading) {
		return { isLoading: true }
	}

	return {
		isLoading: currentUser.isLoading,
		isError: currentUser.isError,
		name: currentUser.data.Title,
		id: currentUser.data.Id,
		email: currentUser.data.Email,
		proponent: getUserProponent(),
		isOwner: getIsOwner(),
	}
}
