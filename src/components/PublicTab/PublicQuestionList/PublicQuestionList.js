import React from 'react'
import { usePublicQuestions, SPList } from 'Components'
import { LinearProgress } from '@material-ui/core'

export const PublicQuestionList = () => {
	const publicQuestionsList = usePublicQuestions()

	console.log('publicQuestionsList :>> ', publicQuestionsList)

	if (publicQuestionsList.isLoading) return <LinearProgress />

	return (
		<SPList
			listName={publicQuestionsList.list.Title}
			columns={publicQuestionsList.columns}
			items={publicQuestionsList.items}
			columnFiltering={false}
			isLoading={publicQuestionsList.isLoading}
			title={publicQuestionsList.list.Title}
		/>
	)
}
