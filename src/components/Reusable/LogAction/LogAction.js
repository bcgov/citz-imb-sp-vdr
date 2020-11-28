import React, { useContext } from 'react'
import { UserContext } from 'Components'
import { AddItemsToList } from 'citz-imb-sp-utilities'
import * as moment from 'moment'

export const LogAction = async (action) => {
	alert('do not use LogAction: useLogAction instead')
	const user = useContext(UserContext)

	const timeStamp = moment().format('dddd, MMMM Do, YYYY @ h:mm:ss a')
	const activity = `${user.name} ${action} on ${timeStamp}`

	console.warn('LogAction :>> ', { action, timeStamp, user })
	await AddItemsToList({
		listName: 'ActivityLog',
		items: { Title: activity, User: user.name, Proponent: user.proponent },
	})

	return
}
