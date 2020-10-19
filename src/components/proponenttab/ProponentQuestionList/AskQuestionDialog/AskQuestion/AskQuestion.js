import { AddItemsToList, GetGroupMembers } from 'citz-imb-sp-utilities'

import {
	LogAction,
	SendQuestionConfirmationEmail,
	SendQuestionNotificationEmail,
} from 'Components'

export const AskQuestion = async (
	question,
	listName,
	enqueueSnackbar,
	proponentName,
	groupId,
) => {
	console.log('listName :>> ', listName);
	await AddItemsToList({
		listName: listName,
		items: {
			Title: question,
		},
	})

	LogAction(`asked '${question}'`)
	enqueueSnackbar('Question Submitted Successfully', {
		variant: 'success',
	})
	const groupMembers = await GetGroupMembers({ groupId: groupId })

	SendQuestionConfirmationEmail(groupMembers, proponentName)
	SendQuestionNotificationEmail()
}
