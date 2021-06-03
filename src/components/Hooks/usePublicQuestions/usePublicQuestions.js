import { useList } from 'components/Hooks'

export const usePublicQuestions = () => {
	return useList('Questions')
}
