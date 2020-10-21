import {AddItemsToList, UpdateListItem} from 'citz-imb-sp-utilities'

export const AnswerQuestion = async (sanitizedQuestion, answer, listName, itemId) => {
    console.log(sanitizedQuestion, answer)

    const publicQuestion = await AddItemsToList({
		listName: 'Questions',
		items: {
			Question: sanitizedQuestion,
            Answer: answer
        },
    })

    console.log('publicQuestion :>> ', publicQuestion);

    const privateQuestion = await UpdateListItem({
		listName: listName,
		items: {
			Id: itemId,
            Answer: `${publicQuestion[0].Id}`
        },
    })

    console.log('privateQuestion :>> ', privateQuestion);

    return 0
}
