import React from 'react'
import {
	LinearProgress,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
	AnswerCell,
	useCurrentUser,
	SelectColumnFilter,
} from 'components'
import { SPList } from 'components/SharePoint'

import { AskQuestion } from './AskQuestion/AskQuestion'

export const ProponentQuestionList = () => {
	const currentUser = useCurrentUser()
	const proponentQuestionListName = `${currentUser.proponent}_Questions`

	if (currentUser.isLoading) return <LinearProgress />

	const initialState = { sortBy: [{ id: 'Created', desc: true }] }
	const customColumns = [
		{
			Filter: SelectColumnFilter,
			accessor: 'AnswerStatus',
			Header: 'Status / Answer',
			Cell: ({ value, row }) => {
				return (
					<AnswerCell
						row={row}
						showWithdrawButton={true}
						value={value}
						proponentQuestionsListName={proponentQuestionListName}
					/>
				)
			},
		},
	]

	const tableProps = {
		title: 'Submitted Questions',
		columnFiltering: true,
		tableActions: [<AskQuestion listName={proponentQuestionListName} />],
	}

	if (!currentUser.isProponent)
		return <Alert severity={'info'}>User is not a proponent</Alert>

	return (
		<SPList
			listName={proponentQuestionListName}
			customColumns={customColumns}
			initialState={initialState}
			tableProps={tableProps}
		/>
	)
}
