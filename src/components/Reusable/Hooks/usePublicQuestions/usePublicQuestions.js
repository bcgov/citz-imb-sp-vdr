import { useList } from 'components'

export const usePublicQuestions = () => {
	return useList({ listName: 'Questions' })
}
