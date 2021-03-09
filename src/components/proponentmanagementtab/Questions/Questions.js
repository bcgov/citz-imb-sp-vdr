import React, { useState } from 'react'
import { AnswerDialog } from './AnswerDialog/AnswerDialog'
import { SelectColumnFilter, AnswerCell } from 'components'
import { SPList } from 'components/SharePoint'
import { Assignee } from './Assignee/Assignee'

export const Questions = (props) => {
	const { UUID } = props

	const questionListName = `${UUID}_Questions`

	const customColumns = [
		{
			Filter: SelectColumnFilter,
			accessor: 'AnswerStatus',
			Header: 'Status / Answer',
			Cell: ({ value, row }) => {
				return <AnswerCell row={row} value={value} />
			},
		},
		{
			Filter: SelectColumnFilter,
			accessor: 'Assignee',
			Cell: ({ value, row }) => {
				return row.original.AnswerStatus === 'Withdrawn' ? null : (
					// <Assignee
					// 	assignedTo={value}
					// 	originalValues={row.original}
					// 	listName={questionListName}
					// 	updateAnswer={updateAnswer}
					// 	postAnswer={postAnswer}
					// />
					null
				)
			},
		},
	]

	const tableProps = {
		columnFiltering: true,
		showTitle: false,
	}

	//========================================
	const [dialogOptions, setDialogOptions] = useState({ open: false, UUID })

	const closeAnswerDialog = () => {
		setDialogOptions({ open: false, UUID })
	}

	const postAnswer = (props) => {
		console.log('postAnswer props :>> ', props)
		const { QuestionID, Id, Title } = props
		setDialogOptions({
			open: true,
			QuestionID,
			Id,
			Title,
			UUID,
			closeAnswerDialog,
		})
	}

	const updateAnswer = (props) => {
		console.log('updateAnswer props :>> ', props)
		const { QuestionID, Id, Title, Answer } = props

		setDialogOptions({
			open: true,
			isUpdate: true,
			QuestionID,
			AnswerId: parseInt(Answer),
			Id,
			Title,
			Answer,
			UUID,
			closeAnswerDialog,
		})
	}

	return (
		<>
			<SPList
				listName={questionListName}
				customColumns={customColumns}
				tableProps={tableProps}
			/>
			<AnswerDialog {...dialogOptions} />
		</>
	)
}
