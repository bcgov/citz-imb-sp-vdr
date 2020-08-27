import {
	AddItemsToList,
	GetGroupMembers,
	SendEmail,
} from 'citz-imb-sp-utilities'

import { LogAction } from 'Components'

export const AskQuestion = async ({
	question,
	listName,
	proponent,
	group,
	handleDirty,
}) => {
	await AddItemsToList({
		listName: listName,
		items: {
			Title: question,
		},
	})

	LogAction(`asked '${question}'`)
	handleDirty(true)

	const groupMembers = await GetGroupMembers({ groupId: group })
	const groupEmails = groupMembers.map((user) => {
		return user.Email
	})

	SendEmail({
		to: groupEmails,
		subject: 'test subject',
		body: 'test body',
	})
}
