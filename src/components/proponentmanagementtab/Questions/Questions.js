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
	useList,
	AnswerCell,
	SPList,
	PublicQuestionsContext,
	useLogAction,
	FormikDialog,
} from 'Components'
import { Assignee } from './Assignee/Assignee'
import { LinearProgress } from '@material-ui/core'

export const Questions = (props) => {
	const { UUID } = props

	const [dialogOptions, setDialogOptions] = useState({ open: false, UUID })

	const proponentQuestions = useList(`${UUID}_Questions`, {
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
					return (
						<AnswerCell
							row={row}
							// setDialogOptions={setDialogOptions}
							value={value}
						/>
					)
				},
			},
			{
				Filter: proponentQuestions.SelectColumnFilter,
				accessor: 'Assignee',
				Cell: ({ value, row }) => {
					return row.original.AnswerStatus === 'Withdrawn' ? null : (
						<Assignee
							assignedTo={value}
							status={row.original.AnswerStatus}
							questionId={row.original.QuestionID}
							question={row.original.Title}
							id={row.original.Id}
							updateItem={proponentQuestions.updateItem}
							// updateAnswer={updateAnswer}
							postAnswer={postAnswer}
						/>
					)
				},
			},
		],
	}

	const closeAnswerDialog = () =>{
		setDialogOptions({ open: false, UUID })
		proponentQuestions.refresh()
	}

	const postAnswer = (props) => {
		console.log('postAnswer props :>> ', props);
		const { questionId, id, question } = props
		setDialogOptions({
			open: true,
			questionId,
			id,
			question,
			UUID,
			closeAnswerDialog,
		})
	}

	const memoizedRender = useMemo(() => {
		if (!proponentQuestions.isLoading) {
			// proponentQuestions.changeView('VICO_Manager')
			return proponentQuestions.getRender(listOptions)
		} else {
			return <LinearProgress />
		}
	}, [proponentQuestions.isLoading])

	// useEffect(() => {
	// 	console.log('proponents :>> ', proponents)
	// 	console.log('publicQuestions :>> ', publicQuestions)
	// 	console.log('proponentQuestions :>> ', proponentQuestions)
	// 	return () => {}
	// }, [])

	return (
		<Fragment>
			{memoizedRender}
			<AnswerDialog {...dialogOptions} />
		</Fragment>
	)

	// <SPList
	// 	listName={proponentQuestions.listName}
	// 	columns={proponentQuestions.columns}
	// 	items={proponentQuestions.items}
	// 	addColumns={proponentQuestions.addColumns}
	// 	isLoading={proponentQuestions.isLoading}
	// 	title={proponentQuestions.title}
	// 	{...listOptions}
	// />
}
