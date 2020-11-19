import React, { Fragment, useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import * as Yup from 'yup'
import {
	AddItemsToList,
	GetListItems,
	UpdateListItem,
} from 'citz-imb-sp-utilities'
import {
	FormikDialog,
	ListTable,
	SPDialog,
	SPTable,
	AnswerQuestionDialog,
	ViewAnswerDialog,
	ViewAnswerButton,
} from 'Components'

//TODO: convert to ListTable
export const ProponentQuestionDialog = ({
	proponentName,
	open,
	listName,
	closeDialog,
}) => {
	const publicQuestionList = 'Questions'
	const [refreshTable, setRefreshTable] = useState(true)
	const [questionDialogOptions, setQuestionsDialogOptions] = useState({
		open: open,
		close: closeDialog,
		title: `${proponentName} Submitted Questions`,
		fullScreen: true,
		dialogContent: (
			<ListTable
				listName={listName}
				refresh={refreshTable}
				customColumns={[
					{
						accessor: 'Answer',
						Cell: ({ value, row }) => {
							console.log('{value, row} :>> ', { value, row })
							return value ? (
								<Button
									data-id={row.original.Id}
									data-answer={row.values.answer}
									onClick={handleViewAnswerClick}
									variant={'contained'}
									>
									View Answer
								</Button>
							) : (
								<Button
									data-id={row.original.Id}
									onClick={handleAnswerClick}
									variant={'contained'}
									color={'primary'}>
									Answer
								</Button>
							)
						},
					},
				]}
			/>
		),
	})
	const [formDialogOptions, setFormDialogOptions] = useState({ open: false })

	const handleViewAnswerClick = (event) => {
		
	}

	const saveAnswer = async (dataId, values) => {
		const { Answer, SanitizedQuestion } = values
		const item = await AddItemsToList({
			listName: publicQuestionList,
			items: { Question: SanitizedQuestion, Answer },
		})
		await UpdateListItem({
			listName,
			items: { Id: dataId, Answer: item[0].Id.toString() },
		})
		console.log('item :>> ', item)
	}

	const handleAnswerClick = async (event) => {
		const dataId = event.currentTarget.getAttribute('data-id')

		console.log('dataId :>> ', dataId)
		console.log('listName :>> ', listName)
		console.log('publicQuestionList :>> ', publicQuestionList)

		const question = await GetListItems({
			listName,
			filter: `Id eq ${dataId}`,
		})
		console.log('question :>> ', question)

		setFormDialogOptions({
			open: true,
			close: () => {
				setFormDialogOptions({ open: false })
			},

			fields: [
				{
					name: 'SanitizedQuestion',
					label: 'Sanitized Question',
					initialValue: question[0].Title,
					validationSchema: Yup.string().required('Required'),
					control: 'input',
				},
				{
					name: 'Answer',
					label: 'Answer',
					initialValue: '',
					validationSchema: Yup.string().required('Required'),
					control: 'input',
				},
			],

			onSubmit: async (values, { setSubmitting }) => {
				await saveAnswer(dataId, values)
				setSubmitting(false)
				setRefreshTable(!refreshTable)
				setFormDialogOptions({ open: false })
			},
			title: 'Answer Question',
			dialogContent: (
				<Alert severity='info'>
					<AlertTitle>Original Question</AlertTitle>
					{question[0].Title}
				</Alert>
			),
			fullWidth: true,
		})
	}

	useEffect(() => {
		console.log('refreshTable :>> ', refreshTable);
		return () => {

		}
	}, [refreshTable])

	//======================
	const [answerDialog, setAnswerDialog] = useState(false)
	const [question, setQuestion] = useState('')
	const [questionId, setQuestionId] = useState()
	const [refresh, setRefresh] = useState(true)
	const [viewAnswerDialog, setViewAnswerDialog] = useState(false)
	const [currentItemId, setCurrentItemId] = useState()

	const closeAnswerDialog = () => {
		setRefresh(!refresh)
		setAnswerDialog(false)
		setViewAnswerDialog(false)
	}

	const openAnswerDialog = (itemId) => {
		setCurrentItemId(itemId)
		setViewAnswerDialog(true)
	}

	const customActions = [
		(rowData) => {
			if (rowData.Answer === null) {
				return {
					icon: () => {
						return (
							<Button
								color='secondary'
								size='small'
								variant='contained'>
								Answer
							</Button>
						)
					},
					tooltip: 'Submit Answer',
					onClick: (event, rowdata) => {
						console.log('rowdata :>> ', rowdata)
						setQuestion(rowdata.Title)
						setQuestionId(rowdata.Id)
						setAnswerDialog(true)
					},
				}
			} else {
				return {
					icon: () => {
						return (
							<ViewAnswerButton
								itemId={rowData.Id}
								onClick={openAnswerDialog}
							/>
						)
					},
					tooltip: 'View Answer',
					onClick: (event, rowdata) => {},
				}
			}
		},
	]

	return (
		<Fragment>
			<FormikDialog {...questionDialogOptions} />
			<FormikDialog {...formDialogOptions} />
			{/* <SPDialog
				open={open}
				title={proponentName}
				showSave={false}
				cancelButtonText={'Close'}
				cancelButtonAction={closeDialog}
				fullScreen={true}>
				<SPTable
					listName={listName}
					tableTitle={'Questions'}
					addItem={false}
					deleteItem={false}
					editItem={false}
					changeItemPermissions={false}
					customActions={customActions}
					refresh={refresh}
				/>
			</SPDialog> */}
			{/* <AnswerQuestionDialog
				open={answerDialog}
				close={closeAnswerDialog}
				listName={listName}
				questionId={questionId}
				question={question}
				proponentName={proponentName}
			/> */}
			{/* <ViewAnswerDialog
				open={viewAnswerDialog}
				closeDialog={closeAnswerDialog}
				listName={listName}
				itemId={currentItemId}
			/> */}
		</Fragment>
	)
}
