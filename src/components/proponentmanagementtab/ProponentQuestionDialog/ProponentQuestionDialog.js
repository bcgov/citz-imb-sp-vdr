import React, { Fragment, useState } from 'react'
import {
	FormikDialog,
	ListTable,
	SPDialog,
	SPTable,
	AnswerQuestionDialog,
	ViewAnswerDialog,
	ViewAnswerButton,
} from 'Components'
import { Button } from '@material-ui/core'
import * as Yup from 'yup'

//TODO: convert to ListTable
export const ProponentQuestionDialog = ({
	proponentName,
	open,
	listName,
	closeDialog,
}) => {
	const publicQuestionList = 'Questions'
	const [questionDialogOptions, setQuestionsDialogOptions] = useState({
		open: true,
		close: () => {
			setQuestionsDialogOptions({ open: false })
		},
		title: `${proponentName} Submitted Questions`,
		fullScreen: true,
		dialogContent: (
			<ListTable
				listName={listName}
				customColumns={[
					{
						accessor: 'Answer',
						Cell: ({ value, row }) => {
							console.log('{value, row} :>> ', { value, row })
							return value ? (
								<Button
									data-id={row.original.Id}
									data-answer={row.values.answer}
									onClick={handleAnswerClick}
									variant={'contained'}
									color={'secondary'}>
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

	const handleAnswerClick = (event) => {
		const dataId = event.currentTarget.getAttribute('data-id')

		console.log('dataId :>> ', dataId)
		console.log('listName :>> ', listName)
		console.log('publicQuestionList :>> ', publicQuestionList)

		setFormDialogOptions({
			open: true,
			close: () => {
				setFormDialogOptions({ open: false })
			},

			fields: [
				{
					name: 'title',
					label: 'Title',
					initialValue: '',
					validationSchema: Yup.string().required('Required'),
					control: 'input',
				},
			],
			onSubmit: (values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)
					alert(JSON.stringify(values, null, 2))
				}, 500)
			},
			title: 'Formik Dialog Form',
			instructions: 'this is how you do it',
			fullWidth: true,
		})
	}

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
