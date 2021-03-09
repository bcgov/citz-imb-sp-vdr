import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AnswerCell, useCurrentUser, SelectColumnFilter, useLogAction, useList } from 'components'
import { SPList } from 'components/SharePoint'

import { AskQuestion } from './AskQuestion/AskQuestion'

export const ProponentQuestionList = () => {
	console.log('ProponentQuestionList')
	const currentUser = useCurrentUser()
	const logAction = useLogAction()
	const proponentQuestionListName = `${currentUser.proponent}_Questions`

	const {updateItem} = useList({listName: proponentQuestionListName})

	if (currentUser.isLoading) return <LinearProgress />

	const handleWithdraw = async (row)=>{
		await updateItem({
			Id: row.original.Id,
			Withdrawn: true,
			AnswerStatus: 'Withdrawn',
			Assignee: '',
		})
		logAction(`successfully withdrew ${row.values.Title}`)
	}

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
						handleWithdraw={handleWithdraw}
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
