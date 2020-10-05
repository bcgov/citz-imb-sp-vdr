import {
	AddItemsToList,
	GetGroupMembers,
} from 'citz-imb-sp-utilities'

import { LogAction,SendQuestionConfirmationEmail } from 'Components'

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

	SendQuestionConfirmationEmail(groupMembers, proponent)
}
