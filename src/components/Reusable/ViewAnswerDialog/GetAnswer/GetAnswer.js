import { GetListItems } from 'citz-imb-sp-utilities'

export const GetQuestionAndAnswer = async (listName, itemId) => {
	const originalQuestion = await GetListItems({
		listName,
		filter: `Id eq ${itemId}`,
	})
	const publicQuestionId = Number(originalQuestion[0].Answer)
	const answer = await GetListItems({
		listName: 'Questions',
		filter: `Id eq ${publicQuestionId}`,
	})

	return {
		originalQuestion: originalQuestion[0].Title,
		sanitizedQuestion: answer[0].Question,
		answer: answer[0].Answer,
	}
}
