import { AddItemsToList, GetGroupMembers } from 'citz-imb-sp-utilities'

import {
	useLogAction,
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
	await AddItemsToList({
		listName: listName,
		items: {
			Title: question,
		},
	})

	useLogAction(`asked '${question}'`)
	enqueueSnackbar('Question Submitted Successfully', {
		variant: 'success',
	})
	const groupMembers = await GetGroupMembers({ groupId: groupId })

	SendQuestionConfirmationEmail(groupMembers, proponentName)
	SendQuestionNotificationEmail()
}
