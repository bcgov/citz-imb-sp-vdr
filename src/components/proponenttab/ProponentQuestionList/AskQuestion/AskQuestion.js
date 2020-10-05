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
	enqueueSnackbar
}) => {
	await AddItemsToList({
		listName: listName,
		items: {
			Title: question,
		},
	})

	LogAction(`asked '${question}'`)
	enqueueSnackbar('Question Submitted Successfully',{
		variant: 'success'
	})
	handleDirty(true)

	const groupMembers = await GetGroupMembers({ groupId: group })

	SendQuestionConfirmationEmail(groupMembers, proponent)
}
