import {
	GetCurrentUser,
	AddItemsToList,
	GetListItems,
} from 'citz-imb-sp-utilities'
import * as moment from 'moment'

const CurrentUser = async () => {
	if (CurrentUser._instance) {
		return CurrentUser._instance
	}

	try {
		const user = await GetCurrentUser({ expand: 'Groups' })
		const proponents = await GetListItems({ listName: 'Proponents' })

		let proponent = ''

		for (let i = 0; i < proponents.length; i++) {
			for (let j = 0; j < user.Groups.results.length; j++) {
				if (proponents[i].GroupId === user.Groups.results[j].Id) {
					proponent = proponents[i].UUID
					break
				}
			}
		}
		CurrentUser._instance = {
			name: user.Title,
			id: user.Id,
			email: user.Email,
			proponent: proponent,
		}
		return CurrentUser._instance
	} catch (err) {
		console.error('err :>> ', err)
	}
}

export const LogAction = async (action) => {
	const user = await CurrentUser()

	const timeStamp = moment().format('dddd, MMMM Do, YYYY @ h:mm:ss a')
	const activity = `${user.name} ${action} on ${timeStamp}`

	console.warn('LogAction :>> ', { action, timeStamp, user })
	await AddItemsToList({
		listName: 'ActivityLog',
		items: { Title: activity, User: user.name, Proponent: user.proponent },
	})

	return
}
