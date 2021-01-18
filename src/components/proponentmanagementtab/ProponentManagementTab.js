import React from 'react'
import { ProponentManagement } from './ProponentManagement/ProponentManagement'
import { useList, useProponents } from 'Components'

export const ProponentsContext = React.createContext()
export const PublicQuestionsContext = React.createContext()

export const ProponentManagementTab = () => {
	const proponents = useProponents()
	const publicQuestions = useList('Questions')

	return (
		<ProponentsContext.Provider value={proponents}>
			<PublicQuestionsContext.Provider value={publicQuestions}>
				<ProponentManagement />
			</PublicQuestionsContext.Provider>
		</ProponentsContext.Provider>
	)
}
