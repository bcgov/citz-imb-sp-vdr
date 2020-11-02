import { useState, useEffect } from 'react'
import {
	AddItemsToList,
	GetCurrentUser,
	GetListItems,
} from 'citz-imb-sp-utilities'

import * as moment from 'moment'

export const useLogAction = (action) => {
	const [currentUser, setCurrentUser] = useState({})

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
			setCurrentUser({
				name: user.Title,
				id: user.Id,
				email: user.Email,
				proponent: proponent,
			})
		} catch (err) {
			console.error('error getting current user :>> ', err)
		}
	}

	useEffect(() => {
		getCurrentUser()
		return () => {}
	}, [])

	useEffect(() => {
		if (currentUser.name) {
			const timeStamp = moment().format('dddd, MMMM Do, YYYY @ h:mm:ss a')
			const activity = `${currentUser.name} ${action} on ${timeStamp}`

			console.warn('useLogAction :>> ', { action, timeStamp, currentUser })

			AddItemsToList({
				listName: 'ActivityLog',
				items: {
					Title: activity,
					User: currentUser.name,
					Proponent: currentUser.proponent,
				},
			})
		}
		return () => {}
	}, [currentUser, action])

	return
}
