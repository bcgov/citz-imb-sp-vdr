import { AddItemsToList, UpdateListItem } from 'citz-imb-sp-utilities'
import { SendPublicAnswerEmail } from 'Components'

export const AnswerQuestion = async (
	sanitizedQuestion,
	answer,
	listName,
	itemId,
	proponentName
) => {
	console.log(sanitizedQuestion, answer)

	const publicQuestion = await AddItemsToList({
		listName: 'Questions',
		items: {
			Question: sanitizedQuestion,
			Answer: answer,
		},
	})

	const privateQuestion = await UpdateListItem({
		listName: listName,
		items: {
			Id: itemId,
			Answer: `${publicQuestion[0].Id}`,
		},
	})

	SendPublicAnswerEmail(proponentName)
}
