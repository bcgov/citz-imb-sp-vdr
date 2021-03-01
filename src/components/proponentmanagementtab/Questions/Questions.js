import React, {
	useContext,
	useEffect,
	useMemo,
	useState,
	Fragment,
} from 'react'
import { QuestionTable } from './QuestionTable/QuestionTable'
import { AnswerDialog } from './AnswerDialog/AnswerDialog'
import { ProponentsContext } from '../ProponentManagementTab'
import {
	ConfigContext,
	useList_OLD,
	AnswerCell,
	SPList_OLD,
	PublicQuestionsContext,
	useLogAction,
	FormikDialog,
} from 'components'
import { Assignee } from './Assignee/Assignee'
import { LinearProgress } from '@material-ui/core'

export const Questions = (props) => {
	const { UUID } = props

	const [dialogOptions, setDialogOptions] = useState({ open: false, UUID })

	const proponentQuestions = useList_OLD(`${UUID}_Questions`, {
		listView: 'VICO_Manager',
	})

	const listOptions = {
		columnFiltering: true,
		showTitle: false,
		customColumns: [
			{
				Filter: proponentQuestions.SelectColumnFilter,
				accessor: 'AnswerStatus',
				Header: 'Status / Answer',
				Cell: ({ value, row }) => {
					return <AnswerCell row={row} value={value} />
				},
			},
			{
				Filter: proponentQuestions.SelectColumnFilter,
				accessor: 'Assignee',
				Cell: ({ value, row }) => {
					return row.original.AnswerStatus === 'Withdrawn' ? null : (
						<Assignee
							assignedTo={value}
							originalValues={row.original}
							updateItem={proponentQuestions.updateItem}
							updateAnswer={updateAnswer}
							postAnswer={postAnswer}
						/>
					)
				},
			},
		],
	}

	const closeAnswerDialog = () => {
		setDialogOptions({ open: false, UUID })
		proponentQuestions.refresh()
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

	const memoizedRender = useMemo(() => {
		if (!proponentQuestions.isLoading) {
			return proponentQuestions.getRender(listOptions)
		} else {
			return <LinearProgress />
		}
	}, [proponentQuestions.isLoading])

	return (
		<Fragment>
			{memoizedRender}
			<AnswerDialog {...dialogOptions} />
		</Fragment>
	)
}
