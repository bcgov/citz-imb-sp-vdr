import { GetCurrentUser, AddItemsToList } from 'citz-imb-sp-utilities'
import * as moment from 'moment'

const getCurrentUser = async () => {
	return await GetCurrentUser({})
}

const CurrentUser = async () => {
	if (CurrentUser._instance) {
		return CurrentUser._instance
	}

	try {
		const response = await getCurrentUser()
		CurrentUser._instance = {
			name: response.Title,
			id: response.Id,
			email: response.Email,
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

	AddItemsToList({
		listName: 'ActivityLog',
		items: { Title: activity, User: user.name },
	})
}
