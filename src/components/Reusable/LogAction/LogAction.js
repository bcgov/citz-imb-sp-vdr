import { useContext } from 'react'
import { CurrentUser } from 'Components'
import { AddItemsToList } from 'citz-imb-sp-utilities'
import * as moment from 'moment'

export const LogAction = async (action) => {
	const user = useContext(CurrentUser)

	const timeStamp = moment().format('dddd, MMMM Do, YYYY @ h:mm:ss a')
	const activity = `${user.name} ${action} on ${timeStamp}`

	console.warn('LogAction :>> ', { action, timeStamp, user })
	await AddItemsToList({
		listName: 'ActivityLog',
		items: { Title: activity, User: user.name, Proponent: user.proponent },
	})

	return
}
