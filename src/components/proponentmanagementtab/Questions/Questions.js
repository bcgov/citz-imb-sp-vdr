import { AnswerCell, SelectColumnFilter, useList, useLogAction } from 'components'
import { SPList } from 'components/SharePoint'
import React, { useState } from 'react'
import { AnswerDialog } from './AnswerDialog/AnswerDialog'
import { Assignee } from './Assignee/Assignee'

export const Questions = (props) => {
	const { UUID } = props

	const questionListName = `${UUID}_Questions`

	const { updateItem } = useList({
		listName:questionListName
	})

	const logAction = useLogAction()

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
					<Assignee
						assignedTo={value}
						originalValues={row.original}
						changeAssignee={changeAssignee}
						updateAnswer={updateAnswer}
					/>
				)
			},
		},
	]

	const tableProps = {
		columnFiltering: true,
		showTitle: false,
	}

	const [dialogOptions, setDialogOptions] = useState({ open: false, UUID })

	const closeAnswerDialog = () => {
		setDialogOptions({ open: false, UUID })
	}

	const changeAssignee = (value, QuestionID, Id, Title) => {
		if (value === 'post') {
			postAnswer({ QuestionID, Id, Title })
		} else {
			updateItem({
				Id: Id,
				AnswerStatus: 'Under Review',
				Assignee: value,
			})
			logAction(`assigned ${QuestionID} to ${value}`)
		}
	}

	const postAnswer = (props) => {
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
