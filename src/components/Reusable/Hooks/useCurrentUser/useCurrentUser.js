import { useState, useEffect } from 'react'
import {
	GetCurrentUser,
	GetListItems,
	GetAssociatedGroups,
} from 'citz-imb-sp-utilities'

export const useCurrentUser = () => {
	const [currentUser, setCurrentUser] = useState()

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
			let isOwner = false
			for (let i = 0; i < user.Groups.results.length; i++) {
				if (
					user.Groups.results[i].Id ===
					assocGroups.AssociatedOwnerGroup.Id
				) {
					isOwner = true
					break
				}
			}

			setCurrentUser({
				name: user.Title,
				id: user.Id,
				email: user.Email,
				proponent: proponent,
				isOwner: isOwner,
			})
		} catch (err) {
			console.error('error getting current user :>> ', err)
		}
	}

	useEffect(() => {
		getCurrentUser()
		return () => {}
	}, [])

	return currentUser
}
