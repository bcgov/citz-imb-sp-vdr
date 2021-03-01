import { useList } from 'Components'

export const usePublicQuestions = () => {
	return useList({ listName: 'Questions' })
}
